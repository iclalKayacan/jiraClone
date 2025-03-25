"use client";
import React, { useState } from "react";

export default function CreateTaskPopup({ onClose, onCreate }) {
  const [taskData, setTaskData] = useState({
    title: "",
    type: "Task",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) return;
    onCreate(taskData);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-md shadow p-3 mt-5">
      <div className="text-sm text-gray-600 mb-2">What needs to be done?</div>
      <textarea
        value={taskData.title}
        onChange={(e) =>
          setTaskData((prev) => ({ ...prev, title: e.target.value }))
        }
        autoFocus
        rows={3}
        className="w-full border border-blue-400 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        placeholder="Enter task title..."
      />
      <div className="flex items-center gap-2 mt-2">
        <select
          value={taskData.type}
          onChange={(e) =>
            setTaskData((prev) => ({ ...prev, type: e.target.value }))
          }
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="Task">Task</option>
          <option value="Bug">Bug</option>
          <option value="Feature">Feature</option>
        </select>
        <button
          onClick={handleSubmit}
          disabled={!taskData.title.trim()}
          className={`px-4 py-1 rounded text-sm ml-auto ${
            !taskData.title.trim()
              ? "bg-blue-300 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Create
        </button>
      </div>
    </div>
  );
}
