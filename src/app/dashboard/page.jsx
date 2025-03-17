// pages/index.js
import ProjectNav from "@/components/ProjectNav";
import SideBar from "@/components/SideBar";
import Board from "@/components/Board";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      
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
