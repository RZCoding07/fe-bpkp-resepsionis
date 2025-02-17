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
  visit_time_from: string
  visit_time_to: string
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
    visit_time_from: "",
    visit_time_to: "",
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
    const loader = toast.loading("Submitting visitor information...", { duration: 300000 })
    try {
      const apiUrl = import.meta.env.VITE_API_URL as string
      if (!apiUrl) {
        throw new Error("API URL is not defined")
      }
      const visitorData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        visitorData.append(key, value)
      })

      // make sure asia jakarta timezone is set
      const visitDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }).split(", ")[0]

      visitorData.append("visit_date", visitDate)
      visitorData.append("visit_time_from", formData.visit_time_from)
      visitorData.append("visit_time_to", formData.visit_time_to)


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
      toast.success("Visitor information submitted successfully", { id: loader })
      setFormData({ fullname: "", phone: "", address: "", purpose: "", email: "", agency: "", departement: "", visit_time_from: "", visit_time_to: "" })
      clearSignature()
    } catch (error) {
      console.error("Error submitting visitor information:", error)
      toast.error("Failed to submit visitor information")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className=" justify-center align-middle items-center flex flex-col">
      <div className="max-w-4xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-900 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Formulir Pendaftaran Pengunjung</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {[
            { label: "Nama lengkap", name: "fullname", type: "text" },
            { label: "Nomor telepon", name: "phone", type: "tel" },
            { label: "Email", name: "email", type: "email" },
            { label: "Instansi", name: "agency", type: "text" },
            { label: "Jabatan", name: "departement", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <Label htmlFor={name}>{label}</Label>
              <Input id={name} name={name} type={type} value={formData[name as keyof FormData]} onChange={handleInputChange} placeholder={`Enter your ${label.toLowerCase()}`} required />
            </div>
          ))}

          <div className="col-span-2">
            <Label htmlFor="address">Alamat</Label>
            <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter your address" required />
          </div>
          <div className="col-span-2">
            <Label htmlFor="visit_date">Tanggal Kunjungi</Label>
            <Input id="visit_date" name="visit_date" type="date" value={new Date().toISOString().split("T")[0]} />
          </div>

          {/*  visit date  now date readonly */}

          <div>
            <Label htmlFor="visit_time_from">Mulai dari</Label>
            <Input id="visit_time_from" name="visit_time_from" type="time" value={formData.visit_time_from} onChange={handleInputChange} required />
          </div>

          <div>
            <Label htmlFor="visit_time_to">Sampai dengan</Label>
            <Input id="visit_time_to" name="visit_time_to" type="time" value={formData.visit_time_to} onChange={handleInputChange} required />
          </div>

          <div className="col-span-2">
            <Label htmlFor="purpose">Tujuan kunjungan</Label>
            <Textarea id="purpose" name="purpose" value={formData.purpose} onChange={handleInputChange} placeholder="Enter the purpose of your visit" required />
          </div>

          <div className="col-span-2">
            <Label>Tanda Tangan Digital</Label>
            <ReactSignatureCanvas ref={sigCanvas} canvasProps={{ className: "border border-gray-300 rounded w-full h-40" }} />
            <Button type="button" onClick={clearSignature} variant="outline" className="mt-2">Clear Signature</Button>
          </div>

          <div className="col-span-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}