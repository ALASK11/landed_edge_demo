"use client"

import { UploadedFile } from "@/app/upload/page"

interface ResultsTableProps {
  files: Record<string, UploadedFile>
  onDelete: (documentName: string) => void
  onDownload: (file: File) => void
  onView: (file: File) => void
  onViewFullReport: (fileData: UploadedFile) => void
}

export default function ResultsTable({
  files,
  onDelete,
  onDownload,
  onView,
  onViewFullReport,
}: ResultsTableProps) {
  const fileList = Object.entries(files)

  if (fileList.length === 0) {
    return (
      <div className="text-center text-zinc-500">
        No documents uploaded yet.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
        <thead className="bg-zinc-50 dark:bg-zinc-800">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-300"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-300"
            >
              Document Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-300"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-300"
            >
              Vendor
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-300"
            >
              Buyer
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-300"
            >
              Value (USD)
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-300"
            >
              Parse Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-300"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-700 dark:bg-black">
          {fileList.map(([docName, fileData]) => (
            <tr key={docName}>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                {fileData.type}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {fileData.documentNumber}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {fileData.date}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {fileData.vendor}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {fileData.buyer}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {fileData.value}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {fileData.parseStatus}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onDownload(fileData.file)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => onView(fileData.file)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onDelete(docName)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onViewFullReport(fileData)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View Full Report
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
