import type React from "react"
import axios from "axios"
import { Layout } from "@/components/custom/layout"
import { Search } from "@/components/search"
import ThemeSwitch from "@/components/theme-switch"
import { UserNav } from "@/components/user-nav"
import { useEffect, useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/custom/button"
import cookie from "js-cookie"
import { toast } from "react-hot-toast"

export default function QrScanner() {
  const user = cookie.get("user")
  const idUser = user ? JSON.parse(user).id : null

  const [scannedText, setScannedText] = useState("")
  const [isScanning, setIsScanning] = useState(true)
  const [parsedData, setParsedData] = useState<{ tag: string; value: string }[]>([])

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

    const onSuccess = (decodedText: any) => {
      console.log(`QR Code scanned: ${decodedText}`)
      setScannedText(decodedText)
      setParsedData(parseTLV(decodedText))
      setIsScanning(false)
      scanner.clear().catch((clearError) => console.error(`Error clearing scanner: ${clearError}`))
    }

    const onError = (errorMessage: any) => {
      // console.error(`QR Code error: ${errorMessage}`)
    }

    scanner.render(onSuccess, onError)

    return () => {
      scanner.clear().catch((clearError) => console.error(`Error clearing scanner: ${clearError}`))
    }
  }, [isScanning])

  const handleRescan = () => {
    setScannedText("")
    setParsedData([])
    setIsScanning(true)
  }

  const parseTLV = (payload: any) => {
    const data = []
    let i = 0

    while (i < payload.length) {
      const tag = payload.substring(i, i + 2)
      const length = Number.parseInt(payload.substring(i + 2, i + 4), 10)
      const value = payload.substring(i + 4, i + 4 + length)
      data.push({ tag, value })
      i += 4 + length
    }

    return data
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submit data:", parsedData)
    const apiUrl = import.meta.env.VITE_API_URL as string
    axios.post(`${apiUrl}/approval-visitors-checkin`, {
      petugas_id: idUser,
      visitor_id: scannedText
    })
    toast.success("Visitor checked in successfully")
    handleRescan()
  }

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  value={scannedText}
                  onChange={(e) => setScannedText(e.target.value)}
                  placeholder="Scanned QR Code value"
                />
                <div className="flex space-x-2">
                  <Button type="submit">Check-In</Button>
                  <Button type="button" variant="outline" onClick={handleRescan}>
                    Scan Again
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </Layout.Body>
    </Layout>
  )
}

