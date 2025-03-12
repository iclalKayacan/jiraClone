import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Board from "@/components/Board";

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        {/* İçerik ya da Board görünümü */}
        <Board />
      </div>
    </div>
  );
}
