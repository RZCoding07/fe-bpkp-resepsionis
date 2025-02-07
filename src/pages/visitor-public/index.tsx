"use client"

import { useState, useRef } from "react"
import axios from "axios"
import { Layout } from "@/components/custom/layout"
import { Search } from "@/components/search"
import ThemeSwitch from "@/components/theme-switch"
import ReactSignatureCanvas from "react-signature-canvas"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/custom/button"
import { toast } from "react-hot-toast"
import { UserNav } from "@/components/user-nav"
import { Label } from "@/components/ui/label"

type FormData = {
  fullname: string
  phone: string
  address: string
  purpose: string
  email: string
  agency: string
  departement: string
}

export default function VisitorForm() {
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    phone: "",
    address: "",
    purpose: "",
    email: "",
    agency: "",
    departement: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sigCanvas = useRef<ReactSignatureCanvas>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      if (!apiUrl) {
        throw new Error("API URL is not defined")
      }
      const visitorData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        visitorData.append(key, value)
      })
      visitorData.append("checkIn", new Date().toISOString().split("T")[1].split(".")[0])
      visitorData.append("visit_date", new Date().toISOString().split("T")[0])
      if (sigCanvas.current) {
        const signatureBlob = await new Promise<Blob>((resolve) => {
          sigCanvas.current!.getTrimmedCanvas().toBlob((blob) => {
            resolve(blob!)
          }, "image/png")
        })
        visitorData.append("signature", signatureBlob, "signature.png")
      }
      await axios.post(`${apiUrl}/visitors`, visitorData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      toast.success("Visitor information submitted successfully")
      setFormData({ fullname: "", phone: "", address: "", purpose: "", email: "", agency: "", departement: "" })
      clearSignature()
    } catch (error) {
      console.error("Error submitting visitor information:", error)
      toast.error("Failed to submit visitor information")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      <Layout.Header>
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Visitor Registration Form</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {[
              { label: "Full Name", name: "fullname", type: "text" },
              { label: "Phone Number", name: "phone", type: "tel" },
              { label: "Email", name: "email", type: "email" },
              { label: "Agency", name: "agency", type: "text" },
              { label: "Department", name: "departement", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <Label htmlFor={name}>{label}</Label>
                <Input id={name} name={name} type={type} value={formData[name as keyof FormData]} onChange={handleInputChange} placeholder={`Enter your ${label.toLowerCase()}`} required />
              </div>
            ))}

            <div className="col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter your address" required />
            </div>

            <div className="col-span-2">
              <Label htmlFor="purpose">Purpose of Visit</Label>
              <Textarea id="purpose" name="purpose" value={formData.purpose} onChange={handleInputChange} placeholder="Enter the purpose of your visit" required />
            </div>

            <div className="col-span-2">
              <Label>Signature</Label>
              <ReactSignatureCanvas ref={sigCanvas} canvasProps={{ className: "border border-gray-300 rounded w-full h-40" }} />
              <Button type="button" onClick={clearSignature} variant="outline" className="mt-2">Clear Signature</Button>
            </div>

            <div className="col-span-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
            </div>
          </form>
        </div>
      </Layout.Body>
    </Layout>
  )
}