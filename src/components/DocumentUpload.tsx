"use client"

import { useCallback, useState } from "react"
import NotesModal from "./NotesModal"
import { UploadedFile } from "@/app/upload/page"

interface DocumentUploadProps {
  onFileSelect: (file: File, notes: string) => void
  documentName: string
  currentFile: UploadedFile | undefined // Add this prop
}

export default function DocumentUpload({
  onFileSelect,
  documentName,
  currentFile, // Destructure the new prop
}: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if (selectedFile) {
        setPendingFile(selectedFile)
        setIsModalOpen(true)
      }
    },
    []
  )

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      setPendingFile(droppedFile)
      setIsModalOpen(true)
    }
  }

  const handleModalSubmit = (notes: string) => {
    if (pendingFile) {
      onFileSelect(pendingFile, notes)
      setPendingFile(null)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setPendingFile(null)
  }

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed  p-6 text-center ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-zinc-200 dark:border-zinc-700"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="mb-2 font-semibold">{documentName}</p>
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id={`file-upload-${documentName}`}
        />
        <label
          htmlFor={`file-upload-${documentName}`}
          className="cursor-pointer rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Select File
        </label>
        {currentFile && <p className="mt-2 text-sm text-zinc-500">{currentFile.file.name}</p>}
      </div>
      {pendingFile && (
        <NotesModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          fileName={pendingFile.name}
        />
      )}
    </>
  )
}
