"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/store/projects/projectApi";
import { FiSearch } from "react-icons/fi";

export default function ProjectPage() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.projects);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const filteredProjects = list.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginated = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (status === "loading") return <p className="p-4">Yükleniyor...</p>;
  if (error) return <p className="p-4 text-red-500">Hata: {error}</p>;

  return (
    <div className="p-8  min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Projects</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          Create Project
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search Projects"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // arama sonrası sayfa sıfırlansın
            }}
            className="w-full border border-gray-300 rounded-md py-2 px-3 pr-10 
                       text-sm focus:outline-none focus:border-blue-500 placeholder:text-gray-400"
          />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <select
          className="border border-gray-300 text-sm rounded-md px-3 py-2"
          defaultValue=""
        >
          <option value="">Filter by product</option>
          <option value="business">Team-managed business</option>
          <option value="software">Team-managed software</option>
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#f4f5f7] text-gray-600 text-sm font-medium">
            <tr>
              <th className="px-6 py-3 text-left">★</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Key</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Lead</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginated.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-[#f0f0f0] transition-all"
              >
                <td className="px-6 py-4 text-gray-400 text-xl">☆</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 text-purple-700 font-bold flex items-center justify-center rounded-md shadow text-sm uppercase">
                      {project.name?.charAt(0)}
                    </div>
                    <div className="text-blue-700 font-medium hover:underline cursor-pointer">
                      {project.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 uppercase text-gray-500">
                  {project.key || "—"}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  Team-managed business
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://avatars.githubusercontent.com/u/1?v=4"
                      alt="Lead"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-gray-800 text-sm">
                      {project.lead || "İclal Kayacan"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-blue-600 hover:underline cursor-pointer">
                  Details
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4 gap-2 text-sm text-gray-600">
        <button
          className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => changePage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
}
