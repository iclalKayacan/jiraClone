// components/ProjectNav.js
import { FiChevronDown } from "react-icons/fi";

export default function ProjectNav({ project }) {
  if (!project) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-blue-50 text-gray-700 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <img
          src={project.icon}
          alt="Project Icon"
          className="w-6 h-6 object-contain"
        />
        <h1 className="text-xl font-semibold">{project.name}</h1>
        <FiChevronDown className="text-gray-500" />
      </div>

      {/* Ortadaki Sekmeler */}
      <nav className="flex items-center gap-8 text-sm">
        <a href="#" className="hover:text-gray-900">
          Summary
        </a>
        <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
          Board
        </a>
        <a href="#" className="hover:text-gray-900">
          List
        </a>
        <a href="#" className="hover:text-gray-900">
          Calendar
        </a>
        <a href="#" className="hover:text-gray-900">
          Timeline
        </a>

        <a href="#" className="hover:text-gray-900 hidden md:inline-block">
          Pages
        </a>
        <a href="#" className="hover:text-gray-900 hidden md:inline-block">
          Attachments
        </a>
        <a href="#" className="hover:text-gray-900 hidden lg:inline-block">
          Issues
        </a>
        <a href="#" className="hover:text-gray-900 hidden lg:inline-block">
          Reports
        </a>
      </nav>

      {/* Sağdaki Menü */}
      <div className="flex items-center gap-6 text-sm">
        <a href="#" className="hover:text-gray-900">
          Automation
        </a>
        <a href="#" className="hover:text-gray-900">
          Project settings
        </a>
      </div>
    </div>
  );
}
