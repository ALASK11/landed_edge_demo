"use client"

import { UploadedFile } from "@/app/upload/page"

interface FullReportModalProps {
  isOpen: boolean
  onClose: () => void
  fileData: UploadedFile | null
}

export default function FullReportModal({
  isOpen,
  onClose,
  fileData,
}: FullReportModalProps) {
  if (!isOpen || !fileData) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-800">
        <h2 className="mb-4 text-xl font-bold">
          Full Report for {fileData.file.name}
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Topline Items</h3>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
              <p>
                <span className="font-semibold">Type:</span> {fileData.type}
              </p>
              <p>
                <span className="font-semibold">Document Number:</span>{" "}
                {fileData.documentNumber}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {fileData.date}
              </p>
              <p>
                <span className="font-semibold">Vendor:</span> {fileData.vendor}
              </p>
              <p>
                <span className="font-semibold">Buyer:</span> {fileData.buyer}
              </p>
              <p>
                <span className="font-semibold">Value (USD):</span>{" "}
                {fileData.value}
              </p>
              <p>
                <span className="font-semibold">Parse Status:</span>{" "}
                {fileData.parseStatus}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Notes</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {fileData.notes || "No notes provided."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Additional Items</h3>
            <div className="mt-2 text-sm text-zinc-500">
              <p>Placeholder for more detailed parsed information...</p>
              {/* Example of more data */}
              <p className="mt-2">
                <span className="font-semibold">Line Item Count:</span> 15
              </p>
              <p>
                <span className="font-semibold">Tax Amount:</span> $123.45
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
