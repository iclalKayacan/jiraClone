"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/context/ProjectsContext";

export default function NewProjectPage() {
  const router = useRouter();
  const { addProject } = useProjects();

  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [type, setType] = useState("Team-managed business");
  const [lead, setLead] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    const newId = Date.now();

    const newProj = {
      id: newId,
      name,
      key,
      type,
      lead,
      isStarred: false,
    };

    addProject(newProj);
    router.push(`/projects/${newId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create New Project</h1>
      <form onSubmit={handleCreate} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Project Name
          </label>
          <input
            type="text"
            className="border w-full px-2 py-1 rounded focus:outline-none 
                       focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Key
          </label>
          <input
            type="text"
            className="border w-full px-2 py-1 rounded focus:outline-none 
                       focus:border-blue-500"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Type
          </label>
          <select
            className="border w-full px-2 py-1 rounded focus:outline-none 
                       focus:border-blue-500"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Team-managed business">Team-managed business</option>
            <option value="Team-managed software">Team-managed software</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Lead
          </label>
          <input
            type="text"
            className="border w-full px-2 py-1 rounded focus:outline-none 
                       focus:border-blue-500"
            value={lead}
            onChange={(e) => setLead(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => router.push("/projects")}
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
