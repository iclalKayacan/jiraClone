// components/SideBar.jsx
"use client";

import Link from "next/link";
import React from "react";
import { useProjects } from "@/context/ProjectsContext"; // Yolunuzu ayarlayın

export default function SideBar() {
  const { projects } = useProjects();

  return (
    <aside className="flex flex-col w-56 bg-white border-r border-gray-200">
      {/* Başlık */}
      <div className="px-4 py-3 border-b">
        <h2 className="text-gray-500 text-sm font-semibold">Projects</h2>
      </div>

      {/* Proje Listesi */}
      <nav className="flex-1 py-2">
        {projects.map((proj) => (
          <Link
            key={proj.id}
            href={`/projects/${proj.id}`}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <img
              src={proj.icon}
              alt="Project Icon"
              className="w-5 h-5 object-contain"
            />
            <span>{proj.name}</span>
          </Link>
        ))}

        <div className="mt-4 px-4 text-xs text-gray-400">RECENT</div>
        <Link
          href="/projects"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          View all projects
        </Link>
      </nav>
    </aside>
  );
}
