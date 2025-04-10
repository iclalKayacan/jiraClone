"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";
import SearchBar from "./SearchBar";
import { createColumn } from "@/store/columns/columnSlice";
import { fetchProjectById } from "@/store/projects/projectApi";

export default function Board() {
  const dispatch = useDispatch();
  const { selectedProject, status, error } = useSelector(
    (state) => state.projects
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading project details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!selectedProject) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No project selected</p>
      </div>
    );
  }

  const handleCreateColumn = async () => {
    if (!newColumnTitle.trim()) return;

    try {
      await dispatch(
        createColumn({
          projectId: selectedProject.id,
          title: newColumnTitle.trim(),
        })
      ).unwrap();

      // Kolon oluşturulduktan sonra sadece bir kez fetch
      await dispatch(fetchProjectById(selectedProject.id)).unwrap();

      setNewColumnTitle("");
      setShowAddColumnModal(false);
    } catch (err) {
      console.error("Kolon oluşturulamadı:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-blue-50 p-4 grow min-h-[calc(100vh-64px)] overflow-x-auto">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <div className="flex items-start gap-4 mt-4">
          {selectedProject.columns && selectedProject.columns.length > 0 ? (
            selectedProject.columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                projectId={selectedProject.id}
                tasks={column.tasks}
              />
            ))
          ) : (
            <p>No columns found for this project</p>
          )}

          <button
            onClick={() => setShowAddColumnModal(true)}
            className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center shadow-md"
            title="Add Column"
          >
            <span className="text-xl font-bold text-gray-600">+</span>
          </button>
        </div>
      </div>

      {/* Yeni Kolon Modal */}
      {showAddColumnModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Yeni Kolon Ekle</h2>
            <input
              type="text"
              placeholder="Kolon adı..."
              className="w-full border px-3 py-2 rounded mb-4"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddColumnModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Kapat
              </button>
              <button
                onClick={handleCreateColumn}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Oluştur
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
