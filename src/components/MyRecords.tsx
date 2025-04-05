import { useState } from 'react'
import { PinataSDK } from 'pinata'
import { uploadToContract } from '../utils/uploadToContract'

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT,
  pinataGateway: import.meta.env.VITE_GATEWAY_URL
})

const MyRecords = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      setUploadStatus('⏳ Uploading to IPFS...')
      const upload = await pinata.upload.public.file(file)

      if (upload?.cid) {
        const ipfsLink = `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${upload.cid}`
        setUploadStatus('📡 Sending to blockchain...')

        await uploadToContract(upload.cid, file.name)

        setUploadedFiles((prev) => [...prev, { name: file.name, url: ipfsLink }])
        setUploadStatus('✅ Uploaded to IPFS & stored on-chain!')
        setFile(null)
      } else {
        setUploadStatus('❌ Upload failed.')
      }
    } catch (error) {
      console.error(error)
      setUploadStatus(`⚠️ Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold">📁 My Medical Records</h2>

      <input type="file" onChange={handleFileChange} className="block" />
      <button
        onClick={handleUpload}
        disabled={!file}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        Upload to IPFS + Chain
      </button>

      {uploadStatus && <p className="text-sm text-gray-700">{uploadStatus}</p>}

      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg">📦 Uploaded Files:</h3>
          <ul className="list-disc list-inside">
            {uploadedFiles.map((f, idx) => (
              <li key={idx}>
                <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {f.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MyRecords
