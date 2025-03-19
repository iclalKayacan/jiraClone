// app/projects/[id]/page.jsx
"use client";
import { useParams } from "next/navigation";
import { useProjects } from "@/context/ProjectsContext";
import ProjectNav from "@/components/ProjectNav";
import Board from "@/components/Board";

export default function ProjectPage() {
  const { id } = useParams();
  const { projects } = useProjects();

  const project = projects.find((p) => p.id === parseInt(id, 10));

  if (!project) {
    return <div className="p-4">Project not found (id: {id})</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Üstte ProjectNav */}
      <ProjectNav project={project} />

      {/* Altında Board */}
      <Board project={project} />
    </div>
  );
}
