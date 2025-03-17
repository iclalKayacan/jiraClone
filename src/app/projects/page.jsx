"use client"; 

import React, { useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Full-Stack",
      key: "FS",
      type: "Team-managed business",
      lead: "sabo",
      icon: "/cloud-icon.png",
    },
    {
      id: 2,
      name: "Learn Jira in 10 minutes",
      key: "LEARNJIRA",
      type: "Team-managed software",
      lead: "İclal Kayacan",
      icon: "/clock-icon.png",
    },
  ]);

  const [searchText, setSearchText] = useState("");

  const [productFilter, setProductFilter] = useState("");

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
    <div className="flex flex-col min-h-screen">

      <div className="flex-1 bg-gray-50 p-6">
        <h1 className="text-2xl font-bold mb-6">Projects</h1>

        {/* Filtre Alanı */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search Projects"
            className="border border-gray-300 rounded px-3 py-2 w-64 text-sm outline-none 
                       focus:border-blue-500"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded px-3 py-2 text-sm outline-none 
                       focus:border-blue-500"
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
          >
            <option value="">Filter by product</option>
            <option value="business">Team-managed business</option>
            <option value="software">Team-managed software</option>
            {/* Diğer ürün tipleri eklenebilir */}
          </select>
        </div>

        {/* Butonlar: Create project, Templates */}
        <div className="flex items-center justify-end gap-2 mb-4">
          <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700">
            Create project
          </button>
          <button className="border border-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-100">
            Templates
          </button>
        </div>

        {/* Proje Tablosu */}
        <table className="w-full bg-white border rounded">
          <thead>
            <tr className="border-b bg-gray-100 text-left">
              <th className="px-4 py-2 w-8"></th> {/* star icon col */}
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Key</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Lead</th>
              <th className="px-4 py-2">Project URL</th>
              <th className="px-4 py-2">More actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((proj) => (
              <tr key={proj.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-center">★</td>
                <td className="px-4 py-2">
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
                <td className="px-4 py-2">{proj.key}</td>
                <td className="px-4 py-2">{proj.type}</td>
                <td className="px-4 py-2">{proj.lead}</td>
                <td className="px-4 py-2 text-sm text-gray-400">-</td>
                <td className="px-4 py-2 text-sm text-gray-400">•••</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex items-center gap-2">
          <button className="border px-2 py-1 rounded text-sm hover:bg-gray-100">
            &lt;
          </button>
          <span className="text-sm">1</span>
          <button className="border px-2 py-1 rounded text-sm hover:bg-gray-100">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
