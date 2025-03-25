// /src/components/FileUploadPreview.jsx
"use client";
import React, { useState } from "react";
import { uploadFile } from "../api/fileUpload";

export default function FileUploadPreview({ taskId, onFileUploadComplete }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      try {
        const filePath = await uploadFile(taskId, file);
        // Eğer yükleme başarılı ise, dosya yolunu üst bileşene iletebilirsiniz.
        onFileUploadComplete && onFileUploadComplete(filePath);
      } catch (error) {
        // Hata yönetimi burada yapılabilir.
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*,application/pdf"
      />
      {previewUrl && (
        <div style={{ marginTop: "10px" }}>
          {selectedFile.type.startsWith("image/") ? (
            <img
              src={previewUrl}
              alt="Dosya Önizleme"
              style={{ maxWidth: "200px" }}
            />
          ) : selectedFile.type === "application/pdf" ? (
            <embed
              src={previewUrl}
              type="application/pdf"
              width="200"
              height="200"
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
