// components/Column.js
import React from "react";

export default function Column({ column }) {
  return (
    <div className="w-64 bg-white border border-gray-200 rounded-md shadow-sm">
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <h2 className="text-sm font-semibold text-gray-700">
          {column.title} ({column.tasks.length})
        </h2>
        {/* Örnek: Renk kodu isterseniz buraya ekleyebilirsiniz */}
      </div>
      <div className="p-2 flex flex-col gap-2">
        {column.tasks.map((task) => (
          <div
            key={task.id}
            className="border border-gray-300 rounded p-2 bg-white hover:shadow"
          >
            <h3 className="text-sm font-medium text-gray-800">{task.title}</h3>
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
            {/* Avatar sağda dursun isterseniz */}
            <div className="mt-2 flex justify-end">
              <img
                src="/user-avatar.jpg"
                alt="User"
                className="w-6 h-6 rounded-full object-cover"
              />
            </div>
          </div>
        ))}
        {/* + Create butonu */}
        <button className="text-blue-500 text-sm px-2 py-1 hover:bg-gray-100 rounded w-full text-left">
          + Create
        </button>
      </div>
    </div>
  );
}
