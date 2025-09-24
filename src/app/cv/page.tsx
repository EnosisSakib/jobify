"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CV {
  id: number;
  title: string;
  fileUrl: string;
  version: string;
  uploadDate: string;
  notes?: string;
}

export default function CVManager() {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      const newCV: CV = {
        id: Date.now(),
        title: file.name,
        fileUrl: data.fileUrl,
        version: "v1",
        uploadDate: new Date().toISOString().split("T")[0],
      };
      setCvs([...cvs, newCV]);
      setFile(null);
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">CV Manager</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <Button onClick={handleUpload} disabled={!file}>
          Upload PDF
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {cvs.map((cv) => (
          <div
            key={cv.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{cv.title}</h2>
              <p className="text-sm text-gray-500">
                {cv.version} • {cv.uploadDate}
              </p>
              {cv.notes && <p className="text-sm">{cv.notes}</p>}
            </div>
            <div className="flex gap-2">
              <a href={cv.fileUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">View</Button>
              </a>
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
