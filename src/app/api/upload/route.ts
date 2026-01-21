import { NextRequest, NextResponse } from "next/server"
import { Storage } from "@google-cloud/storage"
import { admin } from "@/lib/firebase/admin"

const storage = new Storage()
const bucketName = process.env.GCS_BUCKET_NAME!

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization")
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = authHeader.split(" ")[1]
  let decodedToken
  try {
    decodedToken = await admin.auth().verifyIdToken(token)
  } catch (error) {
    console.error("Error verifying token:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { uid } = decodedToken
  if (!uid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const destinationFileName = `${uid}/${Date.now()}-${file.name.replace(
      /[^a-zA-Z0-9.]/g,
      "_"
    )}`

    const bucket = storage.bucket(bucketName)
    const blob = bucket.file(destinationFileName)

    const blobStream = blob.createWriteStream({
      resumable: false,
      private: true,
    })

    await new Promise((resolve, reject) => {
      blobStream.on("error", (err) => {
        console.error("GCS upload stream error:", err)
        reject(new Error("Failed to upload file to Google Cloud Storage."))
      })

      blobStream.on("finish", () => {
        resolve(true)
      })

      blobStream.end(buffer)
    })

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${destinationFileName}`

    return NextResponse.json(
      { message: "File uploaded successfully!", url: publicUrl },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing file upload:", error)
    return NextResponse.json(
      { error: (error as Error).message || "Failed to upload file." },
      { status: 500 }
    )
  }
}
