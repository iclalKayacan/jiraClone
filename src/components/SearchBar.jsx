"use client"; // Eğer Next.js 13+ App Router kullanıyorsanız

import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative inline-block">
      <input
        type="text"
        placeholder="Search board"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-md py-2 px-3 pr-8 
                   text-sm focus:outline-none focus:border-blue-500 
                   placeholder:text-gray-400"
      />
      {/* Sağ kenardaki arama ikonu */}
      <FiSearch
        className="absolute right-2 top-1/2 transform -translate-y-1/2 
                   text-gray-400"
      />
    </div>
  );
}
