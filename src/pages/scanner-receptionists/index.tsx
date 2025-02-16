"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Html5QrcodeScanner } from "html5-qrcode"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import cookie from "js-cookie"

import { Layout } from "@/components/custom/layout"
import { Search } from "@/components/search"
import ThemeSwitch from "@/components/theme-switch"
import { UserNav } from "@/components/user-nav"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/custom/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type FormData = {
  scannedText: string
  employeeId: string
  status: "approve" | "disapprove"
}

export default function QrScanner() {
  const user = cookie.get("user")
  const idUser = user ? JSON.parse(user).id : null

  const [isScanning, setIsScanning] = useState(true)
  const [employees, setEmployees] = useState([])

  const form = useForm<FormData>({
    defaultValues: {
      scannedText: "",
      employeeId: "",
      status: "approve",
    },
  })

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(`${apiUrl}/vw-employees`)
        setEmployees(response.data)
      } catch (error) {
        toast.error("Failed to load employees.")
      }
    }
    fetchEmployees()
  }, [])

  useEffect(() => {
    if (!isScanning) return
    const videoConstraints = {
      width: { ideal: 1920 },
      height: { ideal: 1080 },
      facingMode: "environment",
    }
    const scannerConfig = {
      fps: 30,
      qrbox: 250,
      videoConstraints,
    }
    const scanner = new Html5QrcodeScanner("reader", scannerConfig, false)

    const onSuccess = (decodedText: string) => {
      console.log(`QR Code scanned: ${decodedText}`)
      form.setValue("scannedText", decodedText)
      setIsScanning(false)
      scanner.clear().catch((clearError) => console.error(`Error clearing scanner: ${clearError}`))
    }

    const onError = (errorMessage: string) => {
      // console.error(`QR Code error: ${errorMessage}`)
    }

    scanner.render(onSuccess, onError)

    return () => {
      scanner.clear().catch((clearError) => console.error(`Error clearing scanner: ${clearError}`))
    }
  }, [isScanning, form])

  const handleRescan = () => {
    form.reset()
    setIsScanning(true)
  }

  const onSubmit = async (data: FormData) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const [action, id] = data.scannedText.split("_")

      let endpoint = ""
      if (action === "checkIn") {
        endpoint = `${apiUrl}/visitors/${id}/check-in`
      } else if (action === "checkout") {
        endpoint = `${apiUrl}/approvals/${id}/check-out`
      } else {
        throw new Error("Invalid QR code format")
      }

      const response = await axios.post(endpoint, {
        employeeId: data.employeeId,
        status: data.status,
        userId: idUser,
      })

      if (response.status === 200) {
        toast.success("Operation successful")
        form.reset()
        setIsScanning(true)
      } else {
        toast.error("Operation failed")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
      console.error(error)
    }
  }

  return (
    <Layout>
      <Layout.Header sticky>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="app-container max-h-60">
          {isScanning ? (
            <div id="reader" className="qr-reader"></div>
          ) : (
            <div className="scanner-result space-y-4">
              <h2 className="text-xl font-semibold">QR Code Value:</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="scannedText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Scanned QR Code</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Scanned QR Code value" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employeeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an employee" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {employees.map((employee: any) => (
                              <SelectItem key={employee.id} value={employee.id}>
                                {employee.employee_name} - {employee.division_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="approve">Approve</SelectItem>
                            <SelectItem value="disapprove">Disapprove</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex space-x-2">
                    <Button type="submit">Submit</Button>
                    <Button type="button" variant="outline" onClick={handleRescan}>
                      Scan Again
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
      </Layout.Body>
    </Layout>
  )
}

