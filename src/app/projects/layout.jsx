"use client";
import SideBar from "@/components/SideBar";

export default function ProjectsLayout({ children }) {
  return (
    <div className="flex">
      <aside className="w-56">
        <SideBar />
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
