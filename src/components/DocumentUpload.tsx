"use client"

import { useCallback, useState } from "react"

interface DocumentUploadProps {
  onFileSelect: (file: File) => void;
  documentName: string;
}

export default function DocumentUpload({ onFileSelect, documentName }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if (selectedFile) {
        setFile(selectedFile)
        onFileSelect(selectedFile)
      }
    },
    [onFileSelect]
  )

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 p-6 text-center dark:border-zinc-700">
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
      {file && <p className="mt-2 text-sm text-zinc-500">{file.name}</p>}
    </div>
  )
}
