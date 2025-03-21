"use client";
import React, { useState, useEffect } from "react";
import Column from "./Column";
import SearchBar from "./SearchBar";
import TaskDetailModal from "./TaskDetailModal";

function AddColumnModal({ onClose, onCreate }) {
  const [columnName, setColumnName] = useState("");

  const handleSubmit = () => {
    if (!columnName.trim()) return;
    onCreate(columnName.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md min-w-[300px]">
        <h2 className="text-lg font-bold mb-2">Create status</h2>
        <label className="block text-sm text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
          className="border border-gray-300 w-full px-2 py-1 mb-4 rounded"
          placeholder="e.g. Review"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

function generateId(prefix) {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

export default function Board({ project }) {
  const [columns, setColumns] = useState(() => project.columns || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);

  useEffect(() => {
    setColumns(project.columns || []);
  }, [project]);

  function handleCreateTask(colId, taskData) {
    setColumns((prevCols) =>
      prevCols.map((col) =>
        col.id === colId
          ? {
              ...col,
              tasks: [...col.tasks, { id: generateId("task"), ...taskData }],
            }
          : col
      )
    );
  }

  function handleCreateColumn(newColumnName) {
    setColumns((prevCols) => [
      ...prevCols,
      { id: generateId("col"), title: newColumnName, tasks: [] },
    ]);
  }

  function handleUpdateColumnTitle(columnId, newTitle) {
    setColumns((prevCols) =>
      prevCols.map((col) =>
        col.id === columnId
          ? {
              ...col,
              title: newTitle,
            }
          : col
      )
    );
  }

  const filteredColumns = columns.map((col) => ({
    ...col,
    tasks: col.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="bg-blue-50 p-4 min-h-screen overflow-auto">
      <div className="mb-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="flex items-start gap-4">
        {filteredColumns.map((col) => (
          <Column
            key={col.id}
            column={col}
            onCreateTask={handleCreateTask}
            onSelectTask={setSelectedTask}
            onUpdateTitle={handleUpdateColumnTitle}
          />
        ))}
        <button
          onClick={() => setShowAddColumnModal(true)}
          className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center font-bold"
        >
          +
        </button>
      </div>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {showAddColumnModal && (
        <AddColumnModal
          onClose={() => setShowAddColumnModal(false)}
          onCreate={handleCreateColumn}
        />
      )}
    </div>
  );
}
