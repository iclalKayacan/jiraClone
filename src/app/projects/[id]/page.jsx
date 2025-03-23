"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const Board = dynamic(() => import("@/components/Board"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <div className="text-gray-500">Loading board...</div>
    </div>
  ),
});

export default function ProjectDetailPage() {
  const params = useParams();
  const { list: projects } = useSelector((state) => state.projects);

  const project = projects.find((p) => p.id === Number(params.id));

  if (!project) {
    return <div className="p-4">Proje bulunamadı!</div>;
  }

  return (
    <div className="flex flex-col h-full">

      {/* Board bileşeni */}
      <Board project={project} />
    </div>
  );
}
