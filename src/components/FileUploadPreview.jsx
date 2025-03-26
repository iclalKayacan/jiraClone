// /src/components/FileUploadPreview.jsx
"use client";
import React, { useState, useRef } from "react";
import { uploadFile } from "../api/fileUpload";

export default function FileUploadPreview({ taskId, onFileUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const filePath = await uploadFile(taskId, file);
      onFileUploadComplete?.(filePath);
    } catch (error) {
      console.error("Dosya yükleme hatası:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,application/pdf"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        {uploading ? "Uploading..." : "Add"}
      </button>
    </div>
  );
}
