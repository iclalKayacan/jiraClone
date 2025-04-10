"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "@/store/projects/projectApi";
import Board from "@/components/Board";

export default function ProjectDetailPage() {
  const { id } = useParams(); // URL'den gelen id
  const dispatch = useDispatch();

  const { selectedProject, status, error } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (id && (!selectedProject || selectedProject.id !== Number(id))) {
      dispatch(fetchProjectById(Number(id)));
    }
  }, [id, selectedProject]); // sadece id ya da selectedProject değişince çalışır

  if (status === "loading") return <p>Loading project detail...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!selectedProject) return <p>No project selected</p>;

  return <Board />;
}
