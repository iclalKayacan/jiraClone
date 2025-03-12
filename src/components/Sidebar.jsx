import Link from "next/link";
import {
  FiHome,
  FiFolder,
  FiList,
  FiUser,
  FiSettings,
  FiPlus,
} from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-60 bg-gray-100 border-r border-gray-200 h-screen p-4">
      {/* Jira logosu veya kendi logonuz */}
      <div className="flex items-center gap-2 mb-6">
        <img
          src="/jira-icon.png"
          alt="Jira Icon"
          className="w-6 h-6 object-contain"
        />
        <span className="text-gray-700 font-semibold text-lg">Jira Clone</span>
      </div>

      {/* Menü */}
      <nav className="flex flex-col gap-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900"
        >
          <FiHome /> Dashboard
        </Link>
        <Link
          href="/projects"
          className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900"
        >
          <FiFolder /> Projects
        </Link>
        <Link
          href="/tasks"
          className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900"
        >
          <FiList /> Tasks
        </Link>
      </nav>

      {/* Alt Taraftaki Butonlar */}
      <div className="mt-auto">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          <FiPlus /> New Project
        </button>
        <Link
          href="/settings"
          className="flex items-center gap-2 px-2 py-2 mt-4 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900"
        >
          <FiSettings /> Settings
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
