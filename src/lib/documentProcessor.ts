export const requiredDocuments = [
  "PO1",
  "PO2",
  "INVOICE1",
  "INVOICE2",
  "PACKING_LIST",
  "FORM_7501",
  "BOL",
  "PAYMENT",
  "COST_WORKSHEET",
  "ACCOUNTING_RECORD",
  "STATEMENT_OF_FACTS",
  "OTHER",
] as const;

export type DocumentType = (typeof requiredDocuments)[number];

const keywordToDocType: [string, DocumentType[]][] = [
    ["PO", ["PO1", "PO2"]],
    ["PURCHASE ORDER", ["PO1", "PO2"]],
    ["INVOICE", ["INVOICE1", "INVOICE2"]],
    ["PACKING LIST", ["PACKING_LIST"]],
    ["FORM_7501", ["FORM_7501"]],
    ["7501", ["FORM_7501"]],
    ["BOL", ["BOL"]],
    ["BILL OF LADING", ["BOL"]],
    ["PAYMENT", ["PAYMENT"]],
    ["COST WORKSHEET", ["COST_WORKSHEET"]],
    ["ACCOUNTING", ["ACCOUNTING_RECORD"]],
    ["STATEMENT OF FACTS", ["STATEMENT_OF_FACTS"]],
];

export function detectDocumentType(fileName: string): DocumentType[] {
    const upperFileName = fileName.toUpperCase();
    for (const [keyword, docTypes] of keywordToDocType) {
        if (upperFileName.includes(keyword)) {
            return docTypes;
        }
    }
    return ["OTHER"];
}


export const validateDocument = (file: File): boolean => {
  // For now, validation always returns true as requested.
  return true;
};

// Assuming UploadedFile interface is defined in src/app/upload/page.tsx
// We will need to import it or define a similar type here if it's not accessible.
// For now, let's assume it's available or we'll adjust later.
import { UploadedFile } from "@/app/upload/page";

export const parseDocument = async (
  file: File,
  notes: string,
  documentName: string
): Promise<UploadedFile> => {
  // Simulate API call or heavy processing
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds

  // Dummy results
  return {
    file,
    notes,
    type: documentName, // Use the documentName passed in
    documentNumber: `DOC-${Math.floor(Math.random() * 10000)}`,
    date: new Date().toISOString().split("T")[0],
    vendor: "Dummy Vendor",
    buyer: "Dummy Buyer",
    value: `$${(Math.random() * 10000).toFixed(2)}`,
    parseStatus: "Success",
  };
};
