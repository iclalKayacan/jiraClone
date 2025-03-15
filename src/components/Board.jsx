"use client";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import TaskModal from "./TaskModal";

/**
 * Aynı sütunda kartların sırasını değiştirir
 */
function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

/**
 * Farklı sütunlar arası kart taşıma
 */
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
          description: "React Native ve Flutter gibi seçenekleri incele.",
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
          description: "Hem front-end hem back-end taraflarını geliştir.",
        },
      ],
    },
    { id: "col-3", title: "KONTROL EDİLSİN", tasks: [] },
    { id: "col-4", title: "DONE", tasks: [] },
  ]);

  // Modal kontrolü ve seçili Task
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /**
   * "Create" popup'ından gelen yeni görevi ilgili sütuna ekleyen fonksiyon
   */
  const handleCreateTask = (colId, taskData) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === colId) {
          return {
            ...col,
            tasks: [
              ...col.tasks,
              {
                id: "task-" + Date.now(), // her yeni karta farklı ID
                description: "",
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
   * Bir karta tıklanınca çalışan fonksiyon
   */
  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  /**
   * Görevi güncelle (modal içi Save)
   */
  const handleUpdateTask = (updatedTask) => {
    // columns içinde bu id'ye sahip kartı bul, güncelle
    const newColumns = columns.map((col) => {
      return {
        ...col,
        tasks: col.tasks.map((t) =>
          t.id === updatedTask.id ? { ...updatedTask } : t
        ),
      };
    });
    setColumns(newColumns);
  };

  /**
   * Görevi sil (modal içi Delete)
   */
  const handleDeleteTask = (taskId) => {
    const newColumns = columns.map((col) => {
      return {
        ...col,
        tasks: col.tasks.filter((t) => t.id !== taskId),
      };
    });
    setColumns(newColumns);
  };

  /**
   * Kartlar sürüklenip bırakıldığında çağrılır
   */
  const onDragEnd = (result) => {
    const { source, destination } = result;
    // destination yoksa (ör. sürükleme alan dışına bırakıldıysa) iptal
    if (!destination) return;

    // Aynı sütun içinde mi?
    if (source.droppableId === destination.droppableId) {
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

  // Modal kapatma
  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  return (
    <div className="bg-blue-50 p-4 min-h-screen overflow-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {columns.map((col) => (
            <Column
              key={col.id}
              column={col}
              onCreateTask={handleCreateTask}
              onSelectTask={handleSelectTask} // Kart tıklandığında Board'a bildirecek
            />
          ))}
        </div>
      </DragDropContext>

      {showModal && selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={closeModal}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
}
