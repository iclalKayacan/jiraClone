"use client"; // Next.js 13+ App Router'daysanız ekleyin

import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import CreateTaskPopup from "./CreateTaskPopup";

export default function Column({ column, onCreateTask }) {
  const [showPopup, setShowPopup] = useState(false);

  // Yeni görev formundan gelen veriyi, ilgili sütuna eklemek için
  const handleCreateTask = (taskData) => {
    onCreateTask(column.id, taskData);
  };

  return (
    <div className="relative w-64 bg-white border border-gray-300 rounded-md shadow-sm mr-4">
      {/* Sütun başlığı */}
      <div className="flex items-center justify-between px-3 py-2">
        <h2 className="text-xs font-bold uppercase tracking-wide text-[#5e6c84]">
          {column.title} ({column.tasks.length})
        </h2>
      </div>

      {/* Kartlar için Droppable alan */}
      <Droppable droppableId={column.id} type="TASK">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-2 flex flex-col gap-2 min-h-[50px]"
          >
            {column.tasks.map((task, index) => (
              <Draggable draggableId={task.id} index={index} key={task.id}>
                {(providedDrag, snapshot) => (
                  <div
                    ref={providedDrag.innerRef}
                    {...providedDrag.draggableProps}
                    {...providedDrag.dragHandleProps}
                    style={{
                      ...providedDrag.draggableProps.style,
                      boxShadow: snapshot.isDragging
                        ? "0 4px 8px rgba(0,0,0,0.2)"
                        : "none",
                    }}
                    className="border border-gray-300 rounded p-2 bg-white hover:shadow transition-shadow"
                  >
                    {/* Kart içeriği */}
                    <h3 className="text-sm font-medium text-gray-800">
                      {task.title}
                    </h3>
                    <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                      <span>{task.date}</span>
                      <span className="px-1 border border-blue-400 text-blue-500 rounded">
                        {task.label}
                      </span>
                    </div>
                    {task.progress && (
                      <div className="text-xs text-gray-500 mt-1">
                        Progress: {task.progress}
                      </div>
                    )}
                    {/* Avatar */}
                    <div className="mt-2 flex justify-end">
                      <img
                        src="/user-avatar.jpg"
                        alt="User"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* +Create butonu */}
      <div className="px-3 pb-3">
        <button
          onClick={() => setShowPopup((prev) => !prev)}
          className="mt-1 text-blue-600 text-sm px-2 py-1 hover:bg-gray-100 rounded w-full text-left"
        >
          + Create
        </button>

        {/* Create Task Popup */}
        {showPopup && (
          <CreateTaskPopup
            onClose={() => setShowPopup(false)}
            onCreate={handleCreateTask}
          />
        )}
      </div>
    </div>
  );
}
