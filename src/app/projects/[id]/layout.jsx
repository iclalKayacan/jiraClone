"use client";

import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProjectById } from "@/store/projects/projectApi";
import SideBar from "@/components/SideBar";
import ProjectNav from "@/components/ProjectNav";

export default function ProjectLayout({ children }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProject, status, error } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (id && (!selectedProject || selectedProject.id !== Number(id))) {
      dispatch(fetchProjectById(Number(id)));
    }
  }, [id, selectedProject, dispatch]);

  if (status === "loading" || !selectedProject) {
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
      <SideBar />
      <div className="flex-1">
        <ProjectNav project={selectedProject} />
        {children}
      </div>
    </div>
  );
}
