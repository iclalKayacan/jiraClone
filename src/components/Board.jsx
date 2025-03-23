"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";
import SearchBar from "./SearchBar";
import TaskDetailModal from "./TaskDetailModal";
import { fetchColumns, createColumn } from "@/store/columns/columnApi";

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
  const dispatch = useDispatch();
  const { items: columns, status } = useSelector((state) => state.columns);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);

  useEffect(() => {
    if (project?.id) {
      dispatch(fetchColumns(project.id));
    }
  }, [dispatch, project?.id]);

  // Sadece bu projeye ait kolonları filtrele
  const projectColumns = columns.filter((col) => col.projectId === project.id);

  const filteredColumns = projectColumns.map((col) => ({
    ...col,
    tasks:
      col.tasks?.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [],
  }));

  async function handleCreateColumn(title) {
    try {
      await dispatch(
        createColumn({
          title,
          projectId: project.id,
          order: columns.length,
        })
      ).unwrap();
      setShowAddColumnModal(false);
    } catch (error) {
      console.error("Kolon oluşturulamadı:", error);
    }
  }

  if (status === "loading") {
    return <div>Loading columns...</div>;
  }

  return (
    <div className="bg-blue-50 p-4 min-h-screen overflow-auto">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="flex items-start gap-4 mt-4">
        {filteredColumns.map((column) => (
          <Column key={column.id} column={column} projectId={project.id} />
        ))}

        <button
          onClick={() => setShowAddColumnModal(true)}
          className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center font-bold"
        >
          +
        </button>
      </div>

      {showAddColumnModal && (
        <AddColumnModal
          onClose={() => setShowAddColumnModal(false)}
          onCreate={handleCreateColumn}
        />
      )}

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}
