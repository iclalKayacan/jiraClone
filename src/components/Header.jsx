import { FiSearch, FiBell, FiSettings, FiUser } from "react-icons/fi";
import { FaJira } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white px-4 py-2 shadow-sm border-b border-gray-200">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <img
            src="/jira-logo.png"
            alt="Jira Logo"
            className="w-6 h-6 object-contain"
          />
          <span className="text-gray-700 font-semibold text-sm">
            Full-Stack
          </span>
        </div>

        {/* Jira’daki menü sekmelerine benzer linkler */}
        <nav className="flex items-center gap-4 text-gray-600 text-sm">
          <a href="#" className="hover:text-gray-900">
            Summary
          </a>
          <a href="#" className="hover:text-gray-900">
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
          <a href="#" className="hover:text-gray-900">
            Approvals
          </a>
        </nav>
      </div>

      {/* Sağ Taraf: Arama kutusu + İkonlar + Avatar */}
      <div className="flex items-center gap-4">
        {/* Arama kutusu */}
        <div className="relative">
          <FiSearch className="absolute left-2 top-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search board..."
            className="pl-8 pr-2 py-1 rounded-md border border-gray-300 focus:border-blue-500 text-sm text-gray-800"
          />
        </div>

        {/* Bildirim, Ayarlar, Kullanıcı gibi simgeler */}
        <FiBell className="text-gray-500 hover:text-gray-700 cursor-pointer" />
        <FiSettings className="text-gray-500 hover:text-gray-700 cursor-pointer" />
        <FiUser className="text-gray-500 hover:text-gray-700 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
