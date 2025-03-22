"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/store/projects/projectApi";

export default function ProjectPage() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projeler</h1>
      <ul>
        {list.map((project) => (
          <li key={project.id} className="mb-2 border p-2 rounded">
            <strong>{project.name}</strong>
            <br />
            {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
