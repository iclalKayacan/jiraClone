// components/Board.js
import React from "react";
import Column from "./Column";

const Board = () => {
  // Örnek olarak statik veri tutabiliriz
  const columns = [
    {
      id: 1,
      title: "To Do",
      tasks: [
        {
          id: 101,
          name: "Full-Stack ilk proje",
          dueDate: "23 MAR",
          label: "FS-1",
        },
        {
          id: 102,
          name: "Mobil App Öğrenimi",
          dueDate: "30 MAR",
          label: "FS-2",
        },
      ],
    },
    {
      id: 2,
      title: "In Progress",
      tasks: [],
    },
    {
      id: 3,
      title: "Kontrol Edilsin",
      tasks: [],
    },
    {
      id: 4,
      title: "Done",
      tasks: [],
    },
  ];

  return (
    <main className="p-4 flex gap-4 overflow-auto bg-gray-50">
      {columns.map((col) => (
        <Column key={col.id} title={col.title} tasks={col.tasks} />
      ))}
    </main>
  );
};

export default Board;
