import axios from "axios";

export async function uploadFile(taskId, files) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await axios.post(
    `https://localhost:44337/api/TaskItem/${taskId}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // CORS ayarlarını sunucuna göre düzenle:
      withCredentials: false,
    }
  );

  // Backend artık 'filePaths' döndürüyor (küçük f)
  return response.data.filePaths;
}
