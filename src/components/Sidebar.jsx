"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProjects } from "@/store/projects/projectApi";

export default function SideBar() {
  const dispatch = useDispatch();
  const { myProjects, status } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchMyProjects());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-4 py-3 border-b">
          <h2 className="text-gray-500 text-sm font-semibold">Projects</h2>
        </div>
        <div className="flex-1 py-2 px-4">
          <p className="text-sm text-gray-500">Loading projects...</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-4 py-3 border-b">
        <h2 className="text-gray-500 text-sm font-semibold">Projects</h2>
      </div>

      <nav className="flex-1 py-2">
        {myProjects?.length > 0 ? (
          <>
            {myProjects.map((proj) => (
              <Link
                key={proj.id}
                href={`/projects/${proj.id}`}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <img
                  src={proj.icon || "/cloud-icon.png"}
                  alt="Project Icon"
                  className="w-5 h-5 object-contain"
                />
                <span>{proj.name}</span>
              </Link>
            ))}
          </>
        ) : (
          <div className="px-4 py-2 text-sm text-gray-500">
            No projects found
          </div>
        )}

        <div className="mt-4 px-4 text-xs text-gray-400">RECENT</div>
        <Link
          href="/projects"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          View all projects
        </Link>
      </nav>
    </aside>
  );
}
