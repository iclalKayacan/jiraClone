"use client";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useProjects } from "@/context/ProjectsContext";

export default function NewProjectModal({ onClose }) {
  const { addProject } = useProjects();

  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [type, setType] = useState("Team-managed business");
  const [lead, setLead] = useState("");

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProj = {
      id: Date.now(),
      name,
      key,
      type,
      lead,
      icon: "/cloud-icon.png",
      isStarred: false,
    };
    addProject(newProj);
    onClose();
  };

  return (
    <>
      {/* Arka plan - blur + yarı saydam */}
      <div
        className="fixed inset-0 z-40 bg-white/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal kutusu */}
      <div
        className="fixed top-1/2 left-1/2 z-50 w-full max-w-md 
                      -translate-x-1/2 -translate-y-1/2
                      bg-white rounded-md shadow-lg p-6"
      >
        {/* Üst kısım: Başlık, kapatma ikonu */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Create New Project
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              className="border w-full px-3 py-2 rounded 
                         focus:outline-none focus:border-blue-500 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key
            </label>
            <input
              type="text"
              className="border w-full px-3 py-2 rounded 
                         focus:outline-none focus:border-blue-500 text-sm"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              className="border w-full px-3 py-2 rounded 
                         focus:outline-none focus:border-blue-500 text-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Team-managed business">
                Team-managed business
              </option>
              <option value="Team-managed software">
                Team-managed software
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lead
            </label>
            <input
              type="text"
              className="border w-full px-3 py-2 rounded 
                         focus:outline-none focus:border-blue-500 text-sm"
              value={lead}
              onChange={(e) => setLead(e.target.value)}
            />
          </div>

          {/* Butonlar */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 px-4 py-2 text-sm rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 text-sm rounded 
                         hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
