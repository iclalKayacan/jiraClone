// components/Column.js
import React from "react";

const Column = ({ title, tasks }) => {
  return (
    <div className="flex flex-col w-64 bg-white rounded-md shadow p-3">
      <h2 className="text-lg font-semibold mb-3">
        {title} ({tasks.length})
      </h2>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border rounded-md p-3 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold">{task.name}</h3>
            <p className="text-sm text-gray-500">
              Due: {task.dueDate} | Label: {task.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
