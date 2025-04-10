"use client";

import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProjects, fetchProjectById } from "@/store/projects/projectApi";
import SideBar from "@/components/SideBar";
import ProjectNav from "@/components/ProjectNav";

export default function ProjectLayout({ children }) {
  const params = useParams();
  const dispatch = useDispatch();

  const {
    list: projects,
    selectedProject,
    status,
    error,
  } = useSelector((state) => state.projects);

  const projectId = Number(params.id);
  const project = projects?.find((p) => p.id === projectId) || selectedProject;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects());
    }

    // Eğer seçili proje yoksa, tekil olarak getir
    if (!project && projectId) {
      dispatch(fetchProjectById(projectId));
    }
  }, [dispatch, status, projectId, project]);

  if (status === "loading" || !project) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading project...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Error loading project: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r">
        <div className="p-4">
          <h1 className="text-xl font-semibold">{project.name}</h1>
          {/* Diğer sidebar içeriği */}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <ProjectNav project={project} />
        {children}
      </div>
    </div>
  );
}
