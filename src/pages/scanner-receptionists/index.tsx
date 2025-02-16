import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QrScanner() {
  const [scannedText, setScannedText] = useState("");
  const [isScanning, setIsScanning] = useState(true);
  const [parsedData, setParsedData] = useState<{ tag: string; value: string }[]>([]);

  useEffect(() => {
    if (!isScanning) return;
    const videoConstraints = {
      width: { ideal: 1920 },
      height: { ideal: 1080 },
      facingMode: "environment",
    };
    const scannerConfig = {
      fps: 30,
      qrbox: 250,
      videoConstraints,
    };
    const scanner = new Html5QrcodeScanner("reader", scannerConfig, false);

    const onSuccess = (decodedText: any) => {
      console.log(`QR Code scanned: ${decodedText}`);
      setScannedText(decodedText);
      setParsedData(parseTLV(decodedText));
      setIsScanning(false);
      scanner
        .clear()
        .catch((clearError) =>
          console.error(`Error clearing scanner: ${clearError}`)
        );
    };

    const onError = (errorMessage: any) => {
      console.error(`QR Code error: ${errorMessage}`);
    };

    scanner.render(onSuccess, onError);

    return () => {
      scanner
        .clear()
        .catch((clearError) =>
          console.error(`Error clearing scanner: ${clearError}`)
        );
    };
  }, [isScanning]);

  const handleRescan = () => {
    setScannedText("");
    setParsedData([]);
    setIsScanning(true);
  };

  const parseTLV = (payload: any) => {
    const data = [];
    let i = 0;

    while (i < payload.length) {
      const tag = payload.substring(i, i + 2);
      const length = parseInt(payload.substring(i + 2, i + 4), 10);
      const value = payload.substring(i + 4, i + 4 + length);
      data.push({ tag, value });
      i += 4 + length;
    }

    return data;
  };


  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="app-container max-h-60">
          {isScanning ? (
            <div id="reader" className="qr-reader"></div>
          ) : (
            <div className="scanner-result">
              <h2 className="result-header">QR Code Value:</h2>
              <p className="result-text">
                {scannedText || "No QR Code scanned yet."}
              </p>
              <h3 className="parsed-header">Parsed Data:</h3>
              <ul className="parsed-list">
                {parsedData.map(({ tag, value }, index) => (
                  <li key={index} className="parsed-item">
                    <strong>Tag:</strong> {tag}, <strong>Value:</strong> {value}
                  </li>
                ))}
              </ul>
              <button onClick={handleRescan} className="rescan-button">
                Scan Again
              </button>
            </div>
          )}
        </div>
      </Layout.Body>
    </Layout>
  );
}
