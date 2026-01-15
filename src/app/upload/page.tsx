"use client"

import { useCallback, useState } from "react"
import DocumentUpload from "@/components/DocumentUpload"

const requiredDocuments = [
  "Proof of Identity",
  "Proof of Address",
  "Pay Stub",
  "Bank Statement",
]

export default function UploadPage() {
  const [files, setFiles] = useState<Record<string, File>>({})
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = useCallback((documentName: string, file: File) => {
    setFiles((prevFiles) => ({ ...prevFiles, [documentName]: file }))
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      const droppedFiles = Array.from(e.dataTransfer.files)
      // For simplicity, we'll just add the first dropped file to the first document type
      if (droppedFiles.length > 0 && requiredDocuments.length > 0) {
        handleFileSelect(requiredDocuments[0], droppedFiles[0])
      }
    },
    [handleFileSelect]
  )

  return (
    <div
      className={`flex min-h-screen flex-col items-center bg-zinc-50 p-8 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50 ${
        isDragging ? "border-4 border-dashed border-blue-500" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="w-full max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold">
          Upload Your Documents
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {requiredDocuments.map((docName) => (
            <DocumentUpload
              key={docName}
              documentName={docName}
              onFileSelect={(file) => handleFileSelect(docName, file)}
            />
          ))}
        </div>
        {Object.keys(files).length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Selected Files:</h2>
            <ul className="mt-4 list-disc pl-5">
              {Object.entries(files).map(([docName, file]) => (
                <li key={docName}>
                  {docName}: {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
