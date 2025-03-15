"use client"; // Eğer Next.js 13+ App Router

import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function Column({ column }) {
  return (
    <div className="w-64 bg-white border border-gray-200 rounded-md shadow-sm mr-4">
      {/* Sütun Başlığı */}
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <h2 className="text-sm font-semibold text-gray-700">
          {column.title} ({column.tasks.length})
        </h2>
        {/* 
         Buraya isterseniz 
         {...providedCol.dragHandleProps}
         verip sadece başlıktan sürükleme yapabilirsiniz (sütunlar için).
        */}
      </div>

      {/* Kartlar için Droppable */}
      <Droppable droppableId={column.id} type="TASK">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-2 flex flex-col gap-2"
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
                    className="border border-gray-300 rounded p-2 bg-white hover:shadow"
                  >
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

            {/* + Create butonu */}
            <button className="text-blue-500 text-sm px-2 py-1 hover:bg-gray-100 rounded w-full text-left">
              + Create
            </button>
          </div>
        )}
      </Droppable>
    </div>
  );
}
