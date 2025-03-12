// pages/index.js
import TopNav from "@/components/TopNav";
import ProjectNav from "@/components/ProjectNav";
import SideBar from "@/components/SideBar";
import Board from "@/components/Board";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* En üst nav */}
      <TopNav />

      {/* Altında proje menüsü + ana içerik */}
      <div className="flex flex-1">
        <SideBar />

        <div className="flex flex-col flex-1">
          <ProjectNav />
          <Board />
        </div>
      </div>
    </div>
  );
}
