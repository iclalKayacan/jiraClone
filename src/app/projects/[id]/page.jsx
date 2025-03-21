"use client";
import ProjectNav from "@/components/ProjectNav";
import React from "react";
import { useParams } from "next/navigation";
import { useProjects } from "@/context/ProjectsContext";
import dynamic from "next/dynamic";

const Board = dynamic(() => import("@/components/Board"), {
  ssr: false, // Board bileşenini sadece client tarafında render et
});

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
