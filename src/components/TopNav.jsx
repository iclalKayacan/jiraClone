// components/TopNav.js
import { FiSearch } from "react-icons/fi";

export default function TopNav() {
  return (
    <nav className="flex items-center justify-between bg-white border-b border-gray-200 px-4 h-10 text-sm shadow-sm">
      {/* Sol Menu */}
      <div className="flex items-center gap-3 h-full">
        <a
          href="#"
          className="flex items-center px-2 hover:bg-gray-100 h-full border-r border-gray-200"
        >
          {/* Jira Logo gibi bir ikon veya metin */}
          <img
            src="/jira-logo.png"
            alt="Jira"
            className="h-4 w-4 object-contain"
          />
        </a>

        <div className="flex items-center gap-2 px-2 hover:bg-gray-100 h-full">
          <span>Your work</span>
        </div>

        <div className="flex items-center gap-2 px-2 hover:bg-gray-100 h-full">
          <span>Projects</span>
        </div>

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

      {/* Sağ Menu */}
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
