"use client"

import { useCallback, useState } from "react"
import DocumentUpload from "@/components/DocumentUpload"
import { requiredDocuments, parseDocument } from "@/lib/documentProcessor"
import ResultsTable from "@/components/ResultsTable"
import FullReportModal from "@/components/FullReportModal"

export interface UploadedFile {
  file: File
  notes: string
  type: string
  documentNumber: string
  date: string
  vendor: string
  buyer: string
  value: string
  parseStatus: "Pending" | "Success" | "Error"
  gcsUrl?: string
}

import { useAuth } from "@/components/AuthProvider"
import { storage } from "@/lib/firebase/client"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export default function UploadPage() {
  const [files, setFiles] = useState<Record<string, UploadedFile>>({})
  const [isFullReportModalOpen, setIsFullReportModalOpen] = useState(false)
  const [selectedFileForReport, setSelectedFileForReport] =
    useState<UploadedFile | null>(null)
  const { user } = useAuth()

  const handleFileSelect = useCallback(
    async (documentName: string, file: File, notes: string) => {
      if (!user) {
        console.error("No user is signed in.")
        return
      }

      // Set initial state with Pending status
      setFiles((prevFiles) => ({
        ...prevFiles,
        [documentName]: {
          file,
          notes,
          type: documentName,
          documentNumber: "N/A",
          date: "N/A",
          vendor: "N/A",
          buyer: "N/A",
          value: "N/A",
          parseStatus: "Pending",
        },
      }))

      try {
        const storageRef = ref(storage, `uploads/${user.uid}/${file.name}`)
        await uploadBytes(storageRef, file)
        const gcsUrl = await getDownloadURL(storageRef)

        // Simulate parsing
        const parsedData = await parseDocument(file, notes, documentName)

        // Update with parsed data and GCS URL
        setFiles((prevFiles) => ({
          ...prevFiles,
          [documentName]: { ...parsedData, gcsUrl },
        }))
      } catch (error) {
        console.error(error)
        // Update status to Error
        setFiles((prevFiles) => ({
          ...prevFiles,
          [documentName]: {
            ...prevFiles[documentName],
            parseStatus: "Error",
          },
        }))
      }
    },
    [user]
  )

  const handleDelete = useCallback((documentName: string) => {
    setFiles((prevFiles) => {
      const newFiles = { ...prevFiles }
      delete newFiles[documentName]
      return newFiles
    })
  }, [])

  const handleDownload = useCallback((file: File) => {
    const url = URL.createObjectURL(file)
    const a = document.createElement("a")
    a.href = url
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [])

  const handleView = useCallback((file: File) => {
    const url = URL.createObjectURL(file)
    window.open(url, "_blank")
  }, [])

  const handleViewFullReport = useCallback((fileData: UploadedFile) => {
    setSelectedFileForReport(fileData)
    setIsFullReportModalOpen(true)
  }, [])

  const handleCloseFullReportModal = () => {
    setIsFullReportModalOpen(false)
    setSelectedFileForReport(null)
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 p-8 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="w-full max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold">
          Upload Your Documents
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {requiredDocuments.map((docName) => (
            <DocumentUpload
              key={docName}
              documentName={docName}
              onFileSelect={(file, notes) =>
                handleFileSelect(docName, file, notes)
              }
              currentFile={files[docName]}
            />
          ))}
        </div>
        <div className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Document Results
          </h2>
          <ResultsTable
            files={files}
            onDelete={handleDelete}
            onDownload={handleDownload}
            onView={handleView}
            onViewFullReport={handleViewFullReport}
          />
        </div>
        <FullReportModal
          isOpen={isFullReportModalOpen}
          onClose={handleCloseFullReportModal}
          fileData={selectedFileForReport}
        />
      </div>
    </div>
  )
}
