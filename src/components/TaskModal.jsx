"use client";
import React, { useState, useEffect } from "react";

export default function TaskModal({
  task,
  onClose,
  onUpdateTask,
  onDeleteTask,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Task verisi geldiğinde formu doldur
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
    }
  }, [task]);

  const handleSave = () => {
    // Değişiklikleri parent'a ilet
    const updated = {
      ...task,
      title,
      description,
    };
    onUpdateTask(updated);
    onClose();
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
    onClose();
  };

  return (
    <>
      {/* Modal arka plan (basit) */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={onClose}
      />

      {/* Modal içi */}
      <div className="fixed top-1/2 left-1/2 z-50 w-96 max-w-full bg-white rounded-md shadow-lg transform -translate-x-1/2 -translate-y-1/2 p-4">
        <h2 className="text-lg font-semibold mb-3">Görev Detayı</h2>

        {/* Title */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          className="border border-gray-300 rounded w-full px-2 py-1 mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          rows={4}
          className="border border-gray-300 rounded w-full px-2 py-1 mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Butonlar */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
