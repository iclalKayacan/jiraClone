"use client";
import { useParams } from "next/navigation";
import { useProjects } from "@/context/ProjectsContext";
import Board from "@/components/Board";

export default function ProjectPage() {
  // URL’deki [id] parametresini alıyoruz:
  const params = useParams();
  // veya: const { id } = useParams();

  // Context’ten projeleri çekiyoruz:
  const { projects } = useProjects();

  // Parametre olarak gelen id’yi integer’a çevirip ilgili projeyi bulalım:
  const project = projects.find((p) => p.id === parseInt(params.id, 10));

  // id geçersizse 404 benzeri bir durum gösterebilirsiniz:
  if (!project) {
    return <div>Project not found</div>;
  }

  // project bilgisini Board'a prop olarak geçiriyoruz
  // Artık Board içinde columns vb. project’ten gelecek
  return <Board project={project} />;
}
