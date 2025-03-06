"use client"

import { useEffect, useState, useCallback } from "react"
import { Layout } from "@/components/custom/layout"
import { Button } from "@/components/custom/button"
import axios from "axios"
import toast from "react-hot-toast"
import * as XLSX from "xlsx"
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { Loading } from '@/components/ui/loading'


export default function Tasks() {
  interface Visitor {
    id: string;
    fullname: string;
    phone: string;
    address: string;
    email: string;
    purpose: string;
    agency: string;
    checkIn: string;
    checkOut?: string;
    visit_date: string;
    signature?: string;
    departement: string;
  }

  const [users, setUsers] = useState<Visitor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiUrl = import.meta.env.VITE_API_URL

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${apiUrl}/visitors`)
      setUsers(response.data)
    } catch (error: any) {
      console.error("Error fetching users:", error)
      setError(error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2200)
    }
  }, [])

  const handleDownload = () => {
    const loadingToast = toast.loading("Downloading... Please wait!", {
      position: "top-right",
    })

    try {
      // Define the headers
      const headers = [
        "Full Name",
        "Phone",
        "Address",
        "Email",
        "Purpose",
        "Agency",
        "Check In",
        "Check Out",
        "Visit Date",
        "Department",
        "Created At",
        "Updated At",
      ]

      // Prepare the data
      const data = users.map((user) => [
        user.fullname,
        user.phone,
        user.address,
        user.email,
        user.purpose,
        user.agency,
        user.checkIn || "",
        user.checkOut || "",
        new Date(user.visit_date).toLocaleDateString(),
        user.departement,
      ])

      // Create a worksheet
      const ws = XLSX.utils.aoa_to_sheet([headers, ...data])

      // Create a workbook and add the worksheet
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Visitors")

      // Generate Excel file
      XLSX.writeFile(wb, "visitors_data.xlsx")

      toast.success("Download complete!", { id: loadingToast })
    } catch (error) {
      console.error("Error downloading file:", error)
      toast.error("Download failed. Please try again.", { id: loadingToast })
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <Layout>


      <Layout.Body>
        <div className="mb-2 flex w-full items-center justify-between rounded-lg border-2 bg-gradient-to-br p-4 shadow-md transition-shadow hover:shadow-lg bg-white dark:from-slate-950 dark:to-slate-900">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-semibold tracking-tight">Data Visitor</h2>
            <p className="text-muted-foreground">Here&apos;s a list of visitors in the system!</p>
          </div>
          <div className="ml-auto flex space-x-2">
            <Button onClick={handleDownload}>Download Excel</Button>
          </div>
        </div>

        <div className='flex-1 overflow-auto rounded-lg bg-white bg-gradient-to-br p-4 px-4 py-5 shadow-md transition-shadow hover:shadow-lg dark:from-slate-950 dark:to-slate-900 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {loading ? (
            // make center div h-full
            <div className='flex h-full items-center justify-center'>
              <Loading />
            </div>
          ) : error ? (
            <p>Error fetching employees</p>
          ) : (
            <DataTable data={users} columns={columns} onRefresh={fetchUsers} />
          )}
        </div>
      </Layout.Body>
    </Layout>
  )
}

