// components/SideBar.js
import Link from "next/link";

export default function SideBar() {
  return (
    <aside className="flex flex-col w-56 bg-white border-r border-gray-200">
      {/* Başlık */}
      <div className="px-4 py-3 border-b">
        <h2 className="text-gray-500 text-sm font-semibold">Projects</h2>
      </div>

      {/* Proje Listesi */}
      <nav className="flex-1 py-2">
        <Link
          href="/projects/full-stack"
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <img
            src="/cloud-icon.png"
            alt="Project Icon"
            className="w-5 h-5 object-contain"
          />
          <span>Full-Stack</span>
        </Link>

        {/* Diğer projeler veya recent */}
        <div className="mt-2 px-4 text-xs text-gray-400">RECENT</div>
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
