"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";
import SearchBar from "./SearchBar";

// -- reorder ve moveTask fonksiyonları (same as before) --
function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function moveTask(sourceList, destList, source, destination) {
  const sourceClone = Array.from(sourceList);
  const destClone = Array.from(destList);
  const [removed] = sourceClone.splice(source.index, 1);
  destClone.splice(destination.index, 0, removed);

  return { newSource: sourceClone, newDest: destClone };
}

export default function Board({ project }) {
  if (!project) {
    return <div className="p-4">No project data</div>;
  }

  const [columns, setColumns] = useState(project.columns || []);
  const [searchTerm, setSearchTerm] = useState("");

  // Yeni task oluşturma
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

  // Sürükle-bırak
  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    // Kolon sürükleniyorsa:
    if (type === "COLUMN") {
      const newCols = reorder(columns, source.index, destination.index);
      setColumns(newCols);
      return;
    }

    // Kart sürükleniyorsa:
    if (source.droppableId === destination.droppableId) {
      // Aynı kolonda sıralama
      const colIndex = columns.findIndex((c) => c.id === source.droppableId);
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
      // Farklı kolonlar arası taşıma
      const sourceColIndex = columns.findIndex(
        (c) => c.id === source.droppableId
      );
      const destColIndex = columns.findIndex(
        (c) => c.id === destination.droppableId
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

  // Filtre
  const filteredColumns = columns.map((col) => ({
    ...col,
    tasks: col.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="bg-blue-50 p-4 min-h-screen overflow-auto">
      <div className="mb-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        {/* Kolonları yatayda sürükleyebilmek için 'type="COLUMN"' */}
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div
              className="flex gap-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filteredColumns.map((col, index) => (
                <Draggable key={col.id} draggableId={col.id} index={index}>
                  {(providedDraggable) => (
                    <div
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                      // Yukarıdaki handleProps, kolonun tamamını "tutma alanı" yapar
                    >
                      <Column column={col} onCreateTask={handleCreateTask} />
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
