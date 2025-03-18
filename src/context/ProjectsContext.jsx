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
            { id: "task-1", title: "Learn React", label: "FS-1" },
            { id: "task-2", title: "Build API", label: "FS-2" },
          ],
        },
        {
          id: "col-2",
          title: "DONE",
          tasks: [{ id: "task-3", title: "Setup project", label: "FS-0" }],
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
          id: "col-1",
          title: "BACKLOG",
          tasks: [{ id: "task-10", title: "Read docs", label: "JR-1" }],
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
