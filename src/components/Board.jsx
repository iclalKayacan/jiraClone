"use client"; // Next.js 13+ App Router'da client component gerektiği için

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";

// Dizi içinde elemanları yeniden sıralama (aynı sütun/satır içinde)
function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function Board() {
  const [columns, setColumns] = useState([
    {
      id: "col-1",
      title: "TO DO",
      tasks: [
        {
          id: "task-1",
          title: "Mobil App Öğrenimi",
          date: "30 MAR",
          label: "FS-2",
          progress: "",
        },
      ],
    },
    {
      id: "col-2",
      title: "IN PROGRESS",
      tasks: [
        {
          id: "task-2",
          title: "Full-Stack ilk proje",
          date: "23 MAR",
          label: "FS-1",
          progress: "0/4",
        },
      ],
    },
    {
      id: "col-3",
      title: "KONTROL EDİLSİN",
      tasks: [],
    },
    {
      id: "col-4",
      title: "DONE",
      tasks: [],
    },
  ]);

  /**
   * react-beautiful-dnd sürükle-bırak işlemi bittiğinde tetiklenir.
   */
  const onDragEnd = (result) => {
    const { destination, source, type } = result;
    // destination yoksa işlem iptal
    if (!destination) return;

    // Eğer sütunları (COLUMN) taşıyorsak
    if (type === "COLUMN") {
      const newColumns = reorder(columns, source.index, destination.index);
      setColumns(newColumns);
      return;
    }

    // Kalan kısım: Kartları (TASK) taşıyoruz
    const sourceColIndex = columns.findIndex(
      (col) => col.id === source.droppableId
    );
    const destColIndex = columns.findIndex(
      (col) => col.id === destination.droppableId
    );

    // Aynı sütun içinde kart sırası değiştiriliyorsa
    if (sourceColIndex === destColIndex) {
      const newTasks = reorder(
        columns[sourceColIndex].tasks,
        source.index,
        destination.index
      );
      const newColumns = [...columns];
      newColumns[sourceColIndex] = {
        ...newColumns[sourceColIndex],
        tasks: newTasks,
      };
      setColumns(newColumns);
    } else {
      // Farklı sütunlar arasında kart taşıma
      const sourceTasks = Array.from(columns[sourceColIndex].tasks);
      const destTasks = Array.from(columns[destColIndex].tasks);

      const [movedItem] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, movedItem);

      const newColumns = [...columns];
      newColumns[sourceColIndex] = {
        ...newColumns[sourceColIndex],
        tasks: sourceTasks,
      };
      newColumns[destColIndex] = {
        ...newColumns[destColIndex],
        tasks: destTasks,
      };
      setColumns(newColumns);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-blue-50 p-4">
      {/* Örnek arama kutusu */}
      <input
        type="text"
        placeholder="Search board"
        className="px-3 py-2 border border-gray-300 rounded w-64 text-sm outline-none focus:border-blue-500 mb-4"
      />

      <DragDropContext onDragEnd={onDragEnd}>
        {/* Sütunları sürüklemek için (direction="horizontal") */}
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div
              className="flex items-start gap-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns.map((col, index) => (
                <Draggable draggableId={col.id} index={index} key={col.id}>
                  {(providedDraggable) => (
                    <div
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                    >
                      {/* Sütun bileşeni */}
                      <Column column={col} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
