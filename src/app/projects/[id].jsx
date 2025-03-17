
import React from "react";
import { useRouter } from "next/router";
import Board from "@/components/Board";

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;


  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 bg-white border-b shadow">
        <h1 className="text-2xl font-bold">Project Detail (ID: {id})</h1>
      </header>

      {/* Board Alanı */}
      <div className="flex-1">
        <Board />
      </div>
    </div>
  );
}
