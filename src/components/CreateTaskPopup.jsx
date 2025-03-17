"use client"; // Next.js 13+ App Router kullanıyorsanız

import React, { useState } from "react";

export default function CreateTaskPopup({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Task");

  // Form onaylandığında
  const handleCreate = () => {
    if (!title.trim()) return;
    // Girdiğimiz verileri ebeveyn bileşene iletiyoruz
    onCreate({ title, type });
    // popup'ı kapat
    onClose();
  };

  return (
    <div className="absolute z-20 mt-2 p-3 w-64 bg-white border border-gray-300 rounded-md shadow-lg">
      {/* Başlık girişi */}
      <label className="block mb-1 text-sm font-medium text-gray-700">
        What needs to be done?
      </label>
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        rows={2}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
      />

      {/* Tip seçimi */}
      <div className="mt-2 flex items-center gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="text-sm border border-gray-300 rounded px-2 py-1"
        >
          <option value="Task">Task</option>
          <option value="Bug">Bug</option>
          <option value="Story">Story</option>
        </select>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white text-sm px-3 py-1 rounded disabled:bg-gray-300"
          disabled={!title.trim()}
        >
          Create
        </button>
      </div>
    </div>
  );
}
