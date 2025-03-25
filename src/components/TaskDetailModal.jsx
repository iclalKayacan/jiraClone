// TaskDetailModal.jsx
"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, patchTaskDescription } from "@/store/tasks/taskSlice";

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

// Asıl Modal
export default function TaskDetailModal({ task, onClose }) {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState(task.description || "");

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

        {/* Yalnızca açıklamayı güncelleyen bileşen */}
        <TaskDescription
          initialDesc={desc}
          onSave={setDesc} // local state de güncellensin
          taskId={task.id} // hangi task güncellenecek
        />

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
