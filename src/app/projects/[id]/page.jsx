"use client";
import ProjectNav from "@/components/ProjectNav";
import React from "react";
import { useParams } from "next/navigation";
import { useProjects } from "@/context/ProjectsContext";
import dynamic from "next/dynamic";

const Board = dynamic(
  () => import("@/components/Board").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading board...</div>
      </div>
    ),
  }
);

export default function ProjectDetailPage() {
  const params = useParams();
  const { projects } = useProjects();

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
