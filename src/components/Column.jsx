"use client";
import React, { useState, useRef, useEffect } from "react";
import CreateTaskPopup from "./CreateTaskPopup";

export default function Column({
  column,
  onCreateTask,
  onSelectTask,
  onUpdateTitle,
  dragHandleProps,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(column.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  // Yeni görev oluşturma
  function handleCreateTask(taskData) {
    onCreateTask(column.id, taskData);
  }

  function handleTitleClick() {
    setIsEditing(true);
  }

  function handleTitleSubmit() {
    if (editedTitle.trim() && editedTitle !== column.title) {
      onUpdateTitle(column.id, editedTitle.trim());
    } else {
      setEditedTitle(column.title);
    }
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleTitleSubmit();
    } else if (e.key === "Escape") {
      setEditedTitle(column.title);
      setIsEditing(false);
    }
  }

  function handleBlur() {
    handleTitleSubmit();
  }

  return (
    <div className="relative w-64 bg-white border border-gray-300 rounded-md shadow-sm mr-4">
      <div
        className="flex items-center justify-between px-3 py-2 cursor-move"
        {...dragHandleProps}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="text-xs font-bold uppercase tracking-wide text-[#5e6c84] w-full border border-blue-500 rounded px-1 py-0.5"
          />
        ) : (
          <h2
            onClick={handleTitleClick}
            className="text-xs font-bold uppercase tracking-wide text-[#5e6c84] cursor-pointer hover:text-blue-600"
          >
            {column.title} ({column.tasks.length})
          </h2>
        )}
      </div>

      {/* Sıradan bir div: Artık Droppable yok */}
      <div className="p-2 flex flex-col gap-2 min-h-[50px]">
        {column.tasks.map((task) => (
          <div
            key={task.id}
            // Göreve tıklanınca üst bileşene bildir (detay modal açmak için)
            onClick={() => onSelectTask && onSelectTask(task)}
            className="border border-gray-300 rounded p-2 bg-white hover:shadow transition-shadow cursor-pointer"
          >
            <h3 className="text-sm font-medium text-gray-800">{task.title}</h3>
            <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
              <span>{task.date}</span>
              {task.label && (
                <span className="px-1 border border-blue-400 text-blue-500 rounded">
                  {task.label}
                </span>
              )}
            </div>
            {task.progress && (
              <div className="text-xs text-gray-500 mt-1">
                Progress: {task.progress}
              </div>
            )}
            <div className="mt-2 flex justify-end">
              <img
                src="/user-avatar.jpg"
                alt="User"
                className="w-6 h-6 rounded-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Yeni Task Oluşturma Butonu */}
      <div className="px-3 pb-3">
        <button
          onClick={() => setShowPopup((prev) => !prev)}
          className="mt-1 text-blue-600 text-sm px-2 py-1 hover:bg-gray-100 rounded w-full text-left"
        >
          + Create
        </button>

        {showPopup && (
          <div className="absolute left-0 top-full mt-2 w-64 z-10">
            <CreateTaskPopup
              onClose={() => setShowPopup(false)}
              onCreate={handleCreateTask}
            />
          </div>
        )}
      </div>
    </div>
  );
}
