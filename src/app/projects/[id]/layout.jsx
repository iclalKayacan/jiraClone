"use client";
import SideBar from "@/components/SideBar";

export default function ProjectLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Solda sabit menü */}
      <aside className="w-56 bg-white border-r border-gray-200">
        <SideBar />
      </aside>

      {/* Sağ taraf: Detay içeriği */}
      <main className="flex-1 flex flex-col bg-blue-50">{children}</main>
    </div>
  );
}
