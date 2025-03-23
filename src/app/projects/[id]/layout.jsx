"use client";

import SideBar from "@/components/SideBar";
import ProjectNav from "@/components/ProjectNav";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProjectLayout({ children }) {
  const params = useParams();
  const { list: projects } = useSelector((state) => state.projects);
  const project = projects.find((p) => p.id === Number(params.id));

  return (
    <div className="flex min-h-screen">
      {/* Solda sabit menü */}
      <aside className="w-56 bg-white border-r border-gray-200">
        <SideBar />
      </aside>

      {/* Sağ taraf */}
      <main className="flex-1 flex flex-col bg-blue-50">
        {project && <ProjectNav project={project} />}
        {children}
      </main>
    </div>
  );
}
