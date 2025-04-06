"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProjects } from "@/store/projects/projectApi";
import Column from "./Column";

export default function Board() {
  const dispatch = useDispatch();
  const { myProjects, status } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchMyProjects());
  }, [dispatch]);

  if (status === "loading") {
    return <div className="p-4">Loading projects...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex space-x-4 overflow-x-auto">
        {myProjects?.map((project) => (
          <div key={project.id} className="flex-none">
            <Column project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
