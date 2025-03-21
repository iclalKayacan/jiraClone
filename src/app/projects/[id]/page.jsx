"use client";
import ProjectNav from "@/components/ProjectNav";
import React from "react";
import { useParams } from "next/navigation";
import { useProjects } from "@/context/ProjectsContext";
import Board from "@/components/Board"; // Board bileşeninin yolu

export default function ProjectDetailPage() {
  const params = useParams();
  const { projects } = useProjects();

  // URL'deki id'yi alıp ilgili projeyi bulalım:
  const project = projects.find((p) => p.id === Number(params.id));

  if (!project) {
    return <div className="p-4">Proje bulunamadı!</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <ProjectNav project={project} />
      <Board project={project} />
    </div>
  );
}
