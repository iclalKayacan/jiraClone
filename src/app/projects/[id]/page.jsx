"use client";
import { useParams } from "next/navigation";
import { useProjects } from "@/context/ProjectsContext";
import ProjectNav from "@/components/ProjectNav";
import Board from "@/components/Board";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { projects } = useProjects();

  const project = projects.find((p) => p.id === parseInt(id, 10));
  if (!project) {
    return <div className="p-4">Project not found</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <ProjectNav project={project} />
      <Board project={project} />
    </div>
  );
}
