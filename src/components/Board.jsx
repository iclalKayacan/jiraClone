"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";
import SearchBar from "./SearchBar";

// Liste içi sıralama fonksiyonu
function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

// Kolonlar arası taşıma fonksiyonu
function moveTask(sourceList, destList, source, destination) {
  const sourceClone = Array.from(sourceList);
  const destClone = Array.from(destList);
  const [removed] = sourceClone.splice(source.index, 1);
  destClone.splice(destination.index, 0, removed);

  return {
    newSource: sourceClone,
    newDest: destClone,
  };
}

export default function Board({ project }) {
  // Eğer project prop'u gelmezse kontrol
  if (!project) {
    return <div className="p-4">No project data</div>;
  }

  // Projedeki columns'u state olarak tutuyoruz:
  const [columns, setColumns] = useState(project.columns || []);

  // Yeni task oluşturma fonksiyonu
  const handleCreateTask = (colId, taskData) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === colId) {
          return {
            ...col,
            tasks: [
              ...col.tasks,
              {
                id: "task-" + Date.now(),
                ...taskData,
              },
            ],
          };
        }
        return col;
      })
    );
  };

  // Sürükle-bırak sonrası çalışacak fonksiyon
  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    // destination yoksa iptal
    if (!destination) return;

    // SÜTUN sürükleniyorsa
    if (type === "COLUMN") {
      const newCols = reorder(columns, source.index, destination.index);
      setColumns(newCols);
      return;
    }

    // KART sürükleniyorsa
    if (source.droppableId === destination.droppableId) {
      // Aynı sütunda sıralamayı değiştir
      const colIndex = columns.findIndex(
        (col) => col.id === source.droppableId
      );
      const newColumns = Array.from(columns);

      const reorderedTasks = reorder(
        newColumns[colIndex].tasks,
        source.index,
        destination.index
      );

      newColumns[colIndex] = {
        ...newColumns[colIndex],
        tasks: reorderedTasks,
      };
      setColumns(newColumns);
    } else {
      // Farklı sütunlar arası taşıma
      const sourceColIndex = columns.findIndex(
        (col) => col.id === source.droppableId
      );
      const destColIndex = columns.findIndex(
        (col) => col.id === destination.droppableId
      );

      const newColumns = Array.from(columns);
      const { newSource, newDest } = moveTask(
        newColumns[sourceColIndex].tasks,
        newColumns[destColIndex].tasks,
        source,
        destination
      );

      newColumns[sourceColIndex] = {
        ...newColumns[sourceColIndex],
        tasks: newSource,
      };
      newColumns[destColIndex] = {
        ...newColumns[destColIndex],
        tasks: newDest,
      };

      setColumns(newColumns);
    }
  };

  // Arama metni
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-blue-50 p-4 min-h-screen overflow-auto">
      {/* Arama bileşeni */}
      <div className="mb-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div
              className="flex gap-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns.map((col, index) => {
                // Arama filtresi (task.title)
                const filteredTasks = col.tasks.filter((task) =>
                  task.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                const columnWithFilteredTasks = {
                  ...col,
                  tasks: filteredTasks,
                };

                return (
                  <Draggable draggableId={col.id} index={index} key={col.id}>
                    {(providedDraggable) => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                      >
                        <Column
                          column={columnWithFilteredTasks}
                          onCreateTask={handleCreateTask}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
