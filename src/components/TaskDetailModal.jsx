"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, patchTaskDescription } from "@/store/tasks/taskSlice";
import FileUploadPreview from "../components/FileUploadPreview"; // dosya ekleme bileşeninizin yolu

// ----------------------------------------------------------
// 1. Basit açıklama alanı (değişiklik yok)
// ----------------------------------------------------------
function TaskDescription({ initialDesc, onSave, taskId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempDesc, setTempDesc] = useState(initialDesc);
  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      await dispatch(
        patchTaskDescription({
          id: taskId,
          description: tempDesc,
        })
      ).unwrap();
      onSave?.(tempDesc);
      setIsEditing(false);
    } catch (error) {
      console.error("Açıklama güncellenirken hata oluştu:", error);
      setTempDesc(initialDesc);
    }
  };

  const handleCancel = () => {
    setTempDesc(initialDesc);
    setIsEditing(false);
  };

  return (
    <div className="space-y-1">
      <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
        Description
      </h3>
      {!isEditing ? (
        <div
          className="p-3 border border-transparent rounded hover:bg-gray-50 cursor-pointer min-h-[48px]"
          onClick={() => setIsEditing(true)}
        >
          {initialDesc.trim().length > 0 ? (
            <p className="text-sm text-gray-800">{initialDesc}</p>
          ) : (
            <p className="text-sm text-gray-400 italic">
              Click to add a description...
            </p>
          )}
        </div>
      ) : (
        <div className="border rounded p-3 bg-white">
          <textarea
            className="w-full h-24 text-sm p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={tempDesc}
            onChange={(e) => setTempDesc(e.target.value)}
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------
// 2. Modal bileşeni
// ----------------------------------------------------------
export default function TaskDetailModal({ task, onClose }) {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState(task.description || "");
  const [uploadedFilePath, setUploadedFilePath] = useState(null);

  const handleDelete = async () => {
    if (window.confirm("Bu görevi silmek istediğine emin misin?")) {
      try {
        await dispatch(deleteTask(task.id)).unwrap();
        onClose();
      } catch (error) {
        console.error("Görev silinemedi:", error);
      }
    }
  };

  // Dosya yükleme tamamlandığında dosya yolunu state'e aktarabilirsiniz
  const handleFileUploadComplete = (filePath) => {
    console.log("Dosya yüklendi:", filePath);
    setUploadedFilePath(filePath);
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-md w-full max-w-3xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-1">
              {task.title || "Görev Başlığı"}
            </h1>
            <span className="inline-block py-1 px-2 bg-blue-100 text-blue-600 text-xs rounded-md">
              {task.status || "In Progress"}
            </span>
          </div>
        </div>

        <hr className="my-4" />

        {/* Açıklama alanı */}
        <TaskDescription initialDesc={desc} onSave={setDesc} taskId={task.id} />

        {/* Dosya yükleme alanı */}
        <div className="my-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Attachments
            </h3>
            <div className="flex items-center">
              <FileUploadPreview
                taskId={task.id}
                onFileUploadComplete={handleFileUploadComplete}
              />
            </div>
          </div>

          {/* Yüklenen dosyaların listesi */}
          <div className="grid grid-cols-2 gap-4">
            {(uploadedFilePath || task.attachment) && (
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {/* Dosya önizleme */}
                <div className="aspect-video bg-gray-50">
                  {isImageFile(uploadedFilePath || task.attachment) ? (
                    <img
                      src={uploadedFilePath || task.attachment}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : isPdfFile(uploadedFilePath || task.attachment) ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <embed
                        src={uploadedFilePath || task.attachment}
                        type="application/pdf"
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Dosya bilgileri */}
                <div className="p-3 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {getFileName(uploadedFilePath || task.attachment)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Added {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <a
                        href={uploadedFilePath || task.attachment}
                        download
                        className="p-1.5 hover:bg-gray-100 rounded-full"
                        title="Download"
                      >
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </a>
                      <button
                        className="p-1.5 hover:bg-gray-100 rounded-full"
                        title="Remove"
                      >
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!uploadedFilePath && !task.attachment && (
              <div className="text-sm text-gray-500 italic p-4 border rounded-lg">
                No attachments yet
              </div>
            )}
          </div>
        </div>

        {/* Diğer bilgiler */}
        <div className="my-4 border-b border-gray-200 pb-2 flex flex-wrap gap-8 text-sm text-gray-700">
          <div>
            <strong>Assignee:</strong>{" "}
            {task.assignee || (
              <span className="text-gray-400">Not Assigned</span>
            )}
          </div>
          <div>
            <strong>Label:</strong>{" "}
            {task.label || <span className="text-gray-400">No Label</span>}
          </div>
          <div>
            <strong>Tarih:</strong>{" "}
            {task.date || <span className="text-gray-400">—</span>}
          </div>
          <div>
            <strong>İlerleme:</strong>{" "}
            {task.progress !== null ? (
              `${task.progress}%`
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </div>
        </div>

        <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
          Comments
        </h2>
        <p className="text-xs text-gray-500 italic">
          (Yorumlar henüz eklenmedi)
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
            Update
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------
// 3. Ek: AttachmentPreview bileşeni
// ----------------------------------------------------------
function AttachmentPreview({ filePath }) {
  /**
   * Dosya uzantısına bakarak tür tespit edebiliriz.
   * Örneğin:
   *   - .jpg, .jpeg, .png, .gif => image
   *   - .pdf => pdf
   *   - diğer => download link
   */
  const fileExtension = filePath.split(".").pop().toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "gif", "bmp", "svg"].includes(
    fileExtension
  );
  const isPdf = fileExtension === "pdf";

  if (isImage) {
    return (
      <div className="w-28 h-28 border rounded flex items-center justify-center overflow-hidden">
        <img
          src={filePath}
          alt="Attachment"
          className="object-cover w-full h-full"
        />
      </div>
    );
  } else if (isPdf) {
    return (
      <div className="w-28 h-28 border rounded flex items-center justify-center overflow-hidden bg-gray-50">
        <embed
          src={filePath}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      </div>
    );
  } else {
    // PDF veya resim dışında bir dosya ise basit link verelim:
    return (
      <a
        href={filePath}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-600"
      >
        Dosyayı indir
      </a>
    );
  }
}

// Dosya türü kontrol fonksiyonları - component dışında tanımlayın
const isImageFile = (filePath) => {
  const ext = filePath?.split(".").pop()?.toLowerCase();
  return ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext);
};

const isPdfFile = (filePath) => {
  return filePath?.toLowerCase().endsWith(".pdf");
};

const getFileName = (filePath) => {
  return filePath?.split("/").pop() || "Unknown file";
};
