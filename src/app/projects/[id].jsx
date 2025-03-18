"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useProjects } from "@/context/ProjectsContext";
import Board from "@/components/Board";

export default function ProjectDetailPage() {
  const params = useParams();
  const { projects } = useProjects();

  // ID
  const projectId = Number(params.id);

  // O proje
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">Project not found</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-white border-b">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <p className="text-sm text-gray-500">{project.type}</p>
      </header>
      <div className="flex-1 overflow-auto bg-gray-50 p-4">
        {/* Board: ama burası local state. 
            Sizin paylaştığınız Board stili sabit columns var. 
            Onu bozmadan kullanırsanız "her projede aynı columns" çıkar.

            Eger gercek veriyi isterseniz Board'a columns prop verip 
            Board'i minimal duzenleyebilirsiniz. 
        */}
        <Board />
        {/* Eger gercek columns gosterimi isterseniz: 
           <Board columns={project.columns} /> 
           // Board icinde columns'i local state'e atamalisiniz. 
        */}
      </div>
    </div>
  );
}
