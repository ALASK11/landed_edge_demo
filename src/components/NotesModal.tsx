"use client"

import { useState } from "react"

interface NotesModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (notes: string) => void
  fileName: string
}

export default function NotesModal({
  isOpen,
  onClose,
  onSubmit,
  fileName,
}: NotesModalProps) {
  const [notes, setNotes] = useState("")

  if (!isOpen) {
    return null
  }

  const handleSubmit = () => {
    onSubmit(notes)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-800">
        <h2 className="mb-4 text-xl font-bold">Add Notes for {fileName}</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-md border border-zinc-300 p-2 dark:border-zinc-600 dark:bg-zinc-700"
          placeholder="Enter your notes here..."
          rows={4}
        />
        <div className="mt-4 rounded-md bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
          <p>
            This document will be automatically parsed shortly after upload.
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
