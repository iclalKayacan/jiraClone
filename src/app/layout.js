// src/app/layout.js
"use client";

import "./globals.css";
import { ProjectsProvider } from "@/context/ProjectsContext";
import TopNav from "@/components/TopNav";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ProjectsProvider>
            <TopNav />
            {children}
          </ProjectsProvider>
        </Provider>
      </body>
    </html>
  );
}
