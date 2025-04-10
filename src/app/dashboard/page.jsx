"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchMyProjects } from "@/store/projects/projectApi";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { myProjects, status } = useSelector((state) => state.projects);

  // Sayfa açılınca projeleri çek
  useEffect(() => {
    dispatch(fetchMyProjects());
  }, [dispatch]);

  // Projeler başarılı bir şekilde geldikten sonra, ilk projeye yönlendir
  useEffect(() => {
    if (status === "succeeded" && myProjects.length > 0) {
      const currentPath = router.asPath; // Get the current path
      const targetPath = `/projects/${myProjects[0].id}`;
      if (currentPath !== targetPath) {
        router.push(targetPath); // Redirect only if not already on the target path
      }
    }
  }, [status, myProjects, router]);

  if (status === "loading") {
    return <p>Loading dashboard...</p>;
  }

  // Eğer hiç projeniz yoksa
  if (myProjects.length === 0) {
    return <p>No projects found</p>;
  }

  // Yönlendirme yapılana kadar (ya da kullanıcı beklerken) göstereceğiniz bir şey
  return <p>Redirecting to your first project...</p>;
}
