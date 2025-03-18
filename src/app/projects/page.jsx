"use client";
import React, { useState } from "react";
import { useProjects } from "@/context/ProjectsContext";
import SearchBar from "@/components/SearchBar";
import NewProjectModal from "@/components/NewProjectModal";

export default function ProjectsPage() {
  const { projects } = useProjects(); // 2 projeyi de okuyor
  const [searchText, setSearchText] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredProjects = projects.filter((proj) => {
    const matchSearch = proj.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchFilter = productFilter
      ? proj.type.toLowerCase().includes(productFilter.toLowerCase())
      : true;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {/* Arama ve Filtre */}
      <div className="flex items-center gap-4 mb-6">
        <SearchBar searchTerm={searchText} setSearchTerm={setSearchText} />
        <select
          className="border border-gray-300 rounded px-3 py-2 text-sm outline-none 
                     focus:border-blue-500"
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
        >
          <option value="">Filter by product</option>
          <option value="business">Team-managed business</option>
          <option value="software">Team-managed software</option>
        </select>
      </div>

      {/* Butonlar */}
      <div className="flex items-center justify-end gap-2 mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700"
        >
          Create project
        </button>
        <button className="border border-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-100">
          Templates
        </button>
      </div>

      {/* Tablo */}
      <table className="w-full text-sm border-collapse bg-white">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="px-4 py-2 w-8 font-normal"></th>
            <th className="px-4 py-2 font-normal">Name</th>
            <th className="px-4 py-2 font-normal">Key</th>
            <th className="px-4 py-2 font-normal">Type</th>
            <th className="px-4 py-2 font-normal">Lead</th>
            <th className="px-4 py-2 font-normal">Project URL</th>
            <th className="px-4 py-2 font-normal">More actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((proj) => (
            <tr key={proj.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-center">
                <span
                  className={
                    proj.isStarred ? "text-yellow-500" : "text-gray-300"
                  }
                >
                  ★
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <img
                    src={proj.icon}
                    alt="proj icon"
                    className="w-5 h-5 object-contain"
                  />
                  <a
                    href={`/projects/${proj.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {proj.name}
                  </a>
                </div>
              </td>
              <td className="px-4 py-3">{proj.key}</td>
              <td className="px-4 py-3">{proj.type}</td>
              <td className="px-4 py-3">{proj.lead}</td>
              <td className="px-4 py-3 text-gray-400">-</td>
              <td className="px-4 py-3 text-gray-400">•••</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination örneği */}
      <div className="mt-4 flex items-center gap-2 text-sm">
        <button className="border px-2 py-1 rounded hover:bg-gray-100">
          &lt;
        </button>
        <span>1</span>
        <button className="border px-2 py-1 rounded hover:bg-gray-100">
          &gt;
        </button>
      </div>

      {/* Yeni Proje Modalı */}
      {showModal && <NewProjectModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
