"use client";
import React, { createContext, useState, useContext } from "react";

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Full-Stack",
      key: "FS",
      type: "Team-managed business",
      lead: "sabo",
      icon: "/cloud-icon.png",
      isStarred: true,
      columns: [
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
      ],
    },
    {
      id: 2,
      name: "Learn Jira in 10 minutes",
      key: "LEARNJIRA",
      type: "Team-managed software",
      lead: "İclal Kayacan",
      icon: "/clock-icon.png",
      isStarred: false,
      columns: [
        {
          id: "col-a",
          title: "BACKLOG",
          tasks: [
            {
              id: "task-10",
              title: "Read docs",
              date: "10 MAR",
              label: "JR-1",
              progress: "",
            },
          ],
        },
        {
          id: "col-b",
          title: "COMPLETED",
          tasks: [],
        },
      ],
    },
  ]);

  const addProject = (newProj) => {
    setProjects((prev) => [...prev, newProj]);
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectsContext);
}
