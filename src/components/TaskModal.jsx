"use client";
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function TaskModal({
  task,
  onClose,
  onUpdateTask,
  onDeleteTask,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Modal açıldığında task verisi form alanlarına yüklenir
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      // Örnek varsayılanlar
      setPriority(task.priority || "Medium");
      setAssignee(task.assignee || "");
      setDueDate(task.dueDate || "");
    }
  }, [task]);

  // Kaydet (Update)
  const handleSave = () => {
    const updated = {
      ...task,
      title,
      description,
      priority,
      assignee,
      dueDate,
    };
    onUpdateTask(updated);
    onClose();
  };

  // Sil (Delete)
  const handleDelete = () => {
    onDeleteTask(task.id);
    onClose();
  };

  return (
    <>
      {/* Blur arka plan */}
      <div
        className="fixed inset-0 z-40 bg-white/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal kutusu */}
      <div
        className="fixed top-1/2 left-1/2 z-50 w-full max-w-3xl 
                   -translate-x-1/2 -translate-y-1/2 
                   bg-white rounded-md shadow-lg p-6"
      >
        {/* Üst kısım: Başlık, Issue Key vb. */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-2">
            {/* Örneğin Issue Key ya da Label */}
            <div className="text-sm text-gray-500 mb-1">
              {task.label ? task.label.toUpperCase() : "ISSUE-KEY"}
            </div>
            {/* Task başlığı */}
            <h2 className="text-2xl font-bold text-gray-800">
              {title || "Untitled Task"}
            </h2>
          </div>

          {/* Kapat butonu (X) */}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* İki sütunlu düzen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sol sütun: Title & Description */}
          <div>
            {/* Title */}
            <label className="block text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 
                         focus:outline-none focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Description */}
            <label className="block mt-4 text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              rows={5}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 
                         focus:outline-none focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Sağ sütun: Assignee, Priority, Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Assignee
            </label>
            <input
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 
                         focus:outline-none focus:border-blue-500"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              placeholder="Kime atanacak?"
            />

            <label className="block mt-4 text-sm font-medium text-gray-600">
              Priority
            </label>
            <select
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 
                         focus:outline-none focus:border-blue-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>

            <label className="block mt-4 text-sm font-medium text-gray-600">
              Due Date
            </label>
            <input
              type="date"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 
                         focus:outline-none focus:border-blue-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex justify-end items-center gap-2 mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded 
                       hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded 
                       hover:bg-blue-700"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 px-4 py-2 rounded 
                       hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
