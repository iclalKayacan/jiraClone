"use client";
import React, { useRef, useState } from "react";
import axios from "axios";

export default function FileUploadPreview({ taskId, onFileUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        `https://localhost:44337/api/TaskItem/${taskId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false,
        }
      );

      console.log("Upload response:", response.data);

      // Hem filePaths hem FilePaths destekleniyor
      const uploadedPaths = response.data.filePaths || response.data.FilePaths;
      if (uploadedPaths) {
        onFileUploadComplete?.(uploadedPaths);
      } else {
        console.warn("Sunucu cevap verdi ama dosya yolu yok:", response.data);
      }
    } catch (error) {
      console.error("Dosya yüklenirken hata:", error);
      alert("Dosya yüklenirken bir hata oluştu: " + error.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        multiple
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
