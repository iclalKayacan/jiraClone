import axios from "axios";

export async function uploadFile(taskId, file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `https://localhost:44337/api/TaskItem/${taskId}/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return response.data.FilePath;
  } catch (error) {
    console.error("Dosya yükleme hatası:", error);
    throw error;
  }
}
