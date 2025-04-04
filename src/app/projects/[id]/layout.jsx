"use client";

import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProjects } from "@/store/projects/projectApi";
import SideBar from "@/components/SideBar";
import ProjectNav from "@/components/ProjectNav";

export default function ProjectLayout({ children }) {
  const params = useParams();
  const dispatch = useDispatch();
  const { items: projects, status } = useSelector((state) => state.projects);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects());
    }
  }, [dispatch, status]);

  // Loading durumu için
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Error durumu için
  if (status === "failed") {
    return <div>Error loading project</div>;
  }

  // Projects array'i hazır olduğunda
  const project = projects?.find((p) => p.id === Number(params.id));

  if (!project) {
    return <div>Project not found</div>;
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
      <div className="flex-1">{children}</div>
    </div>
  );
}
