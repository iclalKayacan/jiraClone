// components/ProjectNav.js
import { FiChevronDown } from "react-icons/fi";

export default function ProjectNav() {
  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2 shadow-sm">
      {/* Sol: Proje Adı + İkon */}
      <div className="flex items-center gap-2">
        <img
          src="/cloud-icon.png"
          alt="Cloud Icon"
          className="w-6 h-6 object-contain"
        />
        <h1 className="text-lg font-semibold">Full-Stack</h1>
        <FiChevronDown className="text-gray-400" />
      </div>

      {/* Ortadaki Sekmeler */}
      <nav className="flex items-center gap-6 text-sm text-gray-500">
        <a href="#" className="hover:text-gray-700">
          Summary
        </a>
        <a href="#" className="hover:text-gray-700 text-blue-600 font-medium">
          Board
        </a>
        <a href="#" className="hover:text-gray-700">
          List
        </a>
        <a href="#" className="hover:text-gray-700">
          Calendar
        </a>
        <a href="#" className="hover:text-gray-700">
          Timeline
        </a>
        <a href="#" className="hover:text-gray-700 hidden md:inline-block">
          Approvals
        </a>
        <a href="#" className="hover:text-gray-700 hidden md:inline-block">
          Forms
        </a>
        <a href="#" className="hover:text-gray-700 hidden md:inline-block">
          Pages
        </a>
        <a href="#" className="hover:text-gray-700 hidden md:inline-block">
          Attachments
        </a>
        <a href="#" className="hover:text-gray-700 hidden lg:inline-block">
          Issues
        </a>
        <a href="#" className="hover:text-gray-700 hidden lg:inline-block">
          Reports
        </a>
      </nav>

      {/* Sağdaki Menü */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <a href="#" className="hover:text-gray-700">
          Automation
        </a>
        <a href="#" className="hover:text-gray-700">
          Project settings
        </a>
      </div>
    </div>
  );
}
