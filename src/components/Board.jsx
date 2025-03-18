"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";
import SearchBar from "./SearchBar"; 


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

  return {
    newSource: sourceClone,
    newDest: destClone,
  };
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
    { id: "col-3", title: "KONTROL EDİLSİN", tasks: [] },
    { id: "col-4", title: "DONE", tasks: [] },
  ]);

 
   
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

  /**
   * Kartlar veya sütunlar sürüklenip bırakıldığında çağrılır
   */
  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    // destination yoksa (ör. sürükleme alan dışına bırakıldıysa) iptal
    if (!destination) return;

    // 1) Sütunları (COLUMN) sürüklediysek
    if (type === "COLUMN") {
      const newCols = reorder(columns, source.index, destination.index);
      setColumns(newCols);
      return;
    }

    // 2) Kartları (TASK) sürüklediysek
    if (source.droppableId === destination.droppableId) {
      // Aynı sütun içinde sıralamayı değiştir
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
      // Farklı sütunlar arası kart taşıma
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


  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-blue-50 p-4 min-h-screen overflow-auto">
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
                // Filtreleme: aranan kelimeyi task.title içinde arar
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
