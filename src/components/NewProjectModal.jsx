"use client";
import React, { useState } from "react";
import { useProjects } from "@/context/ProjectsContext";

export default function NewProjectModal({ onClose }) {
  const { addProject } = useProjects();
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [type, setType] = useState("Team-managed business");
  const [lead, setLead] = useState("");

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
      columns: [],
    };
    addProject(newProj);
    onClose();
  };

  return (
    <>
      {/* Arkaplan */}
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />
      {/* Modal kutusu */}
      <div
        className="fixed top-1/2 left-1/2 z-50 w-full max-w-md 
                   -translate-x-1/2 -translate-y-1/2
                   bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-xl font-bold mb-4">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              Project Name
            </label>
            <input
              className="border w-full px-2 py-1 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Key</label>
            <input
              className="border w-full px-2 py-1 rounded"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              className="border w-full px-2 py-1 rounded"
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
            <label className="block text-sm font-medium mb-1">Lead</label>
            <input
              className="border w-full px-2 py-1 rounded"
              value={lead}
              onChange={(e) => setLead(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
