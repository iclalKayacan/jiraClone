// components/Board.js
import React from "react";
import Column from "./Column";

export default function Board() {
  // Statik örnek veri
  const columns = [
    {
      id: 1,
      title: "TO DO",
      color: "gray",
      tasks: [
        {
          id: 1,
          title: "Full-Stack ilk proje",
          date: "23 MAR",
          label: "FS-1",
          progress: "0/4",
        },
        {
          id: 2,
          title: "Mobil App Öğrenimi",
          date: "30 MAR",
          label: "FS-2",
          progress: "",
        },
      ],
    },
    { id: 2, title: "IN PROGRESS", color: "blue", tasks: [] },
    { id: 3, title: "KONTROL EDİLSİN", color: "gray", tasks: [] },
    { id: 4, title: "DONE", color: "green", tasks: [] },
  ];

  return (
    <div className="flex-1 overflow-auto bg-blue-50 p-4">
      {/* Arama çubuğu (Board üzerindeki) */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search board"
          className="px-3 py-2 border border-gray-300 rounded w-64 text-sm outline-none focus:border-blue-500"
        />
      </div>

      {/* Sütunlar */}
      <div className="flex items-start gap-4">
        {columns.map((col) => (
          <Column key={col.id} column={col} />
        ))}
      </div>
    </div>
  );
}
