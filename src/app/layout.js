// app/layout.js
import "./globals.css";
import { ProjectsProvider } from "@/context/ProjectsContext";
import TopNav from "@/components/TopNav";

export const metadata = {
  title: "My App",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProjectsProvider>
          <TopNav />
          {children}
        </ProjectsProvider>
      </body>
    </html>
  );
}
