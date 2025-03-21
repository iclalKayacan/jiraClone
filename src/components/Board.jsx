"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";
import SearchBar from "./SearchBar";
import TaskDetailModal from "./TaskDetailModal";

// *** Yardımcı fonksiyonlar *** //
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
  // 1) Eğer project gelmezse
  if (!project) {
    return <div className="p-4">No project data</div>;
  }

  // 2) İlk render’da columns state’ini project.columns’dan başlatıyoruz
  //    Sonraki render’larda tekrar başlatmıyoruz:
  const [columns, setColumns] = useState(() => project.columns || []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  // 3) Bir kolondaki göreve tıklayınca, detay modalında gösterebilmek için state tutuyoruz
  function handleSelectTask(task) {
    setSelectedTask(task);
  }

  // 4) Yeni task oluşturma (ilgili kolona push)
  function handleCreateTask(colId, taskData) {
    setColumns((prevCols) =>
      prevCols.map((col) => {
        if (col.id === colId) {
          return {
            ...col,
            tasks: [
              ...col.tasks,
              {
                // task id için unique bir değer üretip sabit kalmasına dikkat edin
                // Geçici olarak Date.now() + random kullanalım
                id:
                  "task-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
                ...taskData,
              },
            ],
          };
        }
        return col;
      })
    );
  }

  // 5) DragDropContext onDragEnd
  function onDragEnd(result) {
    const { source, destination, type } = result;

    // Hedef yoksa (örneğin sürükleme board dışına bırakıldıysa)
    if (!destination) return;

    // --- KOLON SÜRÜKLENİYORSA --- //
    if (type === "COLUMN") {
      setColumns((prevCols) => {
        const newCols = reorder(prevCols, source.index, destination.index);
        return newCols;
      });
      return;
    }

    // --- KART (TASK) SÜRÜKLENİYORSA --- //
    // Aynı kolon içinde sıralama değişiyorsa
    if (source.droppableId === destination.droppableId) {
      setColumns((prevCols) => {
        // source/dest aynı kolonsa reorder
        const colIndex = prevCols.findIndex((c) => c.id === source.droppableId);
        if (colIndex === -1) return prevCols;

        const newCols = Array.from(prevCols);
        const reorderedTasks = reorder(
          newCols[colIndex].tasks,
          source.index,
          destination.index
        );
        newCols[colIndex] = {
          ...newCols[colIndex],
          tasks: reorderedTasks,
        };
        return newCols;
      });
    } else {
      // Farklı kolonlar arası taşıma
      setColumns((prevCols) => {
        const sourceColIndex = prevCols.findIndex(
          (c) => c.id === source.droppableId
        );
        const destColIndex = prevCols.findIndex(
          (c) => c.id === destination.droppableId
        );
        if (sourceColIndex === -1 || destColIndex === -1) return prevCols;

        const newCols = Array.from(prevCols);
        const { newSource, newDest } = moveTask(
          newCols[sourceColIndex].tasks,
          newCols[destColIndex].tasks,
          source,
          destination
        );
        newCols[sourceColIndex] = {
          ...newCols[sourceColIndex],
          tasks: newSource,
        };
        newCols[destColIndex] = {
          ...newCols[destColIndex],
          tasks: newDest,
        };
        return newCols;
      });
    }
  }

  // 6) Arama filtreniz (task title bazında)
  const filteredColumns = columns.map((col) => ({
    ...col,
    tasks: col.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  // *** Render ***
  return (
    <div className="bg-blue-50 p-4 min-h-screen overflow-auto">
      {/* Arama */}
      <div className="mb-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* DragDropContext - Kolonlar */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div
              className="flex gap-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filteredColumns.map((col, index) => (
                <Draggable
                  key={String(col.id)} // id'yi stringe çeviriyoruz
                  draggableId={String(col.id)}
                  index={index}
                >
                  {(providedDraggable) => (
                    <div
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                    >
                      <Column
                        column={col}
                        onCreateTask={handleCreateTask}
                        onSelectTask={handleSelectTask}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Görev Detay Modalı */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}
