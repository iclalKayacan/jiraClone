// components/TopNav.js
import { FiSearch } from "react-icons/fi";
import { SiJira } from "react-icons/si";
import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="flex items-center justify-between bg-white border-b border-gray-200 px-6 h-16 text-sm shadow-sm">
      {/* Sol Menü */}
      <div className="flex items-center gap-3 h-full">
        <a
          href="#"
          className="flex items-center px-2 hover:bg-gray-100 h-full "
        >
          {/* Jira ikonu (React Icons) */}
          <SiJira className="w-6 h-6 text-blue-600" />
        </a>

        <div className="flex items-center gap-2 px-2 hover:bg-gray-100 h-full">
          <span>Your work</span>
        </div>

        <Link
          href="/projects"
          className="px-2 hover:bg-gray-100 h-full flex items-center"
        >
          Projects
        </Link>

        <div className="flex items-center gap-2 px-2 hover:bg-gray-100 h-full">
          <span>Filters</span>
        </div>

        <div className="flex items-center gap-2 px-2 hover:bg-gray-100 h-full">
          <span>Dashboards</span>
        </div>

        <div className="hidden xl:flex items-center gap-2 px-2 hover:bg-gray-100 h-full">
          <span>Teams</span>
        </div>

        <div className="hidden xl:flex items-center gap-2 px-2 hover:bg-gray-100 h-full">
          <span>Plans</span>
        </div>

        <div className="hidden xl:flex items-center gap-2 px-2 hover:bg-gray-100 h-full">
          <span>Assets</span>
        </div>

        <div className="hidden xl:flex items-center gap-2 px-2 hover:bg-gray-100 h-full">
          <span>Apps</span>
        </div>
      </div>

      {/* Sağ Menü */}
      <div className="flex items-center gap-3">
        {/* Arama ikonu */}
        <button className="p-1 hover:bg-gray-100 rounded">
          <FiSearch />
        </button>

        {/* Create Butonu */}
        <button className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700">
          Create
        </button>

        {/* Kullanıcı Avatarı */}
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <img
            src="/user-avatar.jpg"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}
