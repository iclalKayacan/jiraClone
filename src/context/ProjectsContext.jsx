"use client";
import React, { createContext, useContext, useState } from "react";

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Full-Stack",
      key: "FS",
      type: "Team-managed business",
      lead: "sabo",
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
          id: "col-b",
          title: "DONE",
          tasks: [],
        },
      ],
    },
  ]);

  const defaultColumns = [
    { id: "col-1", title: "TO DO", tasks: [] },
    { id: "col-2", title: "IN PROGRESS", tasks: [] },
    { id: "col-3", title: "DONE", tasks: [] },
  ];

  const addProject = (newProj) => {
    if (!newProj.columns || newProj.columns.length === 0) {
      newProj.columns = defaultColumns;
    }
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
