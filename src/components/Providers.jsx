"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ProjectsProvider } from "@/context/ProjectsContext";
import TopNav from "@/components/TopNav";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <ProjectsProvider>
        <TopNav />
        {children}
      </ProjectsProvider>
    </Provider>
  );
}
