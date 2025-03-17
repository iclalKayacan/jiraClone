"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function ProjectsPage() {
  const [projects] = useState([
    { id: 1, name: "Proje A", description: "Örnek Proje Açıklaması" },
    { id: 2, name: "Proje B", description: "Bir başka Proje" },
  ]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      <div className="mb-4">
        <Link href="/projects/new">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            New Project
          </button>
        </Link>
      </div>

      <ul className="space-y-2">
        {projects.map((proj) => (
          <li key={proj.id} className="p-3 border rounded hover:shadow">
            <Link href={`/projects/${proj.id}`}>
              <div>
                <h2 className="text-lg font-semibold">{proj.name}</h2>
                <p className="text-sm text-gray-500">{proj.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
