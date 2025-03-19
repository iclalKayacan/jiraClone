// components/ProjectNav.js
import { FiChevronDown } from "react-icons/fi";

export default function ProjectNav({ project }) {
  if (!project) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-blue-50 text-gray-700">
      {/* Sol: Proje Adı + İkon */}
      <div className="flex items-center gap-2">
        <img
          src={project.icon || "/cloud-icon.png"}
          alt="Project Icon"
          className="w-6 h-6 object-contain"
        />
        <h1 className="text-xl font-semibold">{project.name}</h1>
        <FiChevronDown className="text-gray-500" />
      </div>

      {/* Ortadaki Sekmeler (isterseniz sabit kalabilir) */}
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
        {/* ...devam... */}
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
