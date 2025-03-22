"use client";
import React from "react";
import ProjectNav from "@/components/ProjectNav";
import SideBar from "@/components/SideBar";
import Board from "@/components/Board";

export default function Home() {
  const defaultProject = {
    columns: [
      {
        id: "col-1",
        title: "To Do",
        tasks: [],
      },
      {
        id: "col-2",
        title: "In Progress",
        tasks: [],
      },
      {
        id: "col-3",
        title: "Done",
        tasks: [],
      },
    ],
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-1">
        <SideBar />
        <div className="flex flex-col flex-1">
          <ProjectNav />
          <Board project={defaultProject} />
        </div>
      </div>
    </div>
  );
}
