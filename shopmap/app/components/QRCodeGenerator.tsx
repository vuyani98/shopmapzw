"use client"

import { useState, useEffect } from "react"

interface QRCodeGeneratorProps {
  shopData: {
    id: number
    name: string
  }
}

export default function QRCodeGenerator({ shopData }: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState("")

  useEffect(() => {
    generateQRCode()
  }, [shopData])

  function generateQRCode() {
    // Create shop profile URL (in a real app, this would be your domain)
    const shopUrl = `https://bulawayo-shops.vercel.app/shop/${shopData.id}`

    // Using QR Server API for demo (in production, use a proper QR library)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shopUrl)}`
    setQrCodeUrl(qrUrl)
  }

  function downloadQR() {
    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `${shopData.name}-qr-code.png`
    link.click()
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <h3 className="font-semibold text-gray-900 mb-3">Shop QR Code</h3>

      {qrCodeUrl ? (
        <>
          <div className="bg-white p-4 rounded-lg inline-block mb-4">
            <img
              src={qrCodeUrl || "/placeholder.svg"}
              alt={`QR Code for ${shopData.name}`}
              className="w-48 h-48 mx-auto"
            />
          </div>

          <p className="text-sm text-gray-600 mb-4">Customers can scan this code to view your shop profile</p>

          <button
            onClick={downloadQR}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Download QR Code
          </button>
        </>
      ) : (
        <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <span className="text-gray-500">Generating QR Code...</span>
        </div>
      )}
    </div>
  )
}
