// app/projects/layout.jsx
"use client";
import SideBar from "@/components/SideBar";

export default function ProjectsLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-white border-r border-gray-200">
        <SideBar />
      </aside>

      <main className="flex-1 bg-[#f8faff]">{children}</main>
    </div>
  );
}
