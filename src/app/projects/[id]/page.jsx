// app/projects/[id]/page.jsx
"use client";
import { useParams } from "next/navigation";
import { useProjects } from "@/context/ProjectsContext";
import ProjectNav from "@/components/ProjectNav";
import Board from "@/components/Board";

export default function ProjectPage() {
  const { id } = useParams();
  const { projects } = useProjects();

  // ID eşleşen projeyi bul
  const project = projects.find((p) => p.id === parseInt(id, 10));

  if (!project) {
    return <div className="p-4">Project not found (id: {id})</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Üstte ProjectNav (projenin adı, sekmeler vs.) */}
      <ProjectNav project={project} />

      {/* Altında Board bileşeni */}
      <div className="p-4">
        <Board project={project} />
      </div>
    </div>
  );
}
