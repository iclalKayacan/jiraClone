// pages/projects/new.js

import React, { useState } from "react";
import { useRouter } from "next/router";

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Form onay
  const handleCreate = (e) => {
    e.preventDefault();
    // Şimdilik basit bir alert
    alert(`Yeni Proje: ${name} - ${description}`);

    // Gelecekte buraya API POST isteği ekleyebilirsiniz.
    // Sonra /projects sayfasına yönlendirebilirsiniz:
    router.push("/projects");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">New Project</h1>

      <form onSubmit={handleCreate} className="space-y-4 max-w-md">
        <div>
          <label className="block font-semibold text-sm mb-1">
            Project Name
          </label>
          <input
            type="text"
            className="border w-full px-2 py-1 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold text-sm mb-1">
            Description
          </label>
          <textarea
            className="border w-full px-2 py-1 rounded"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
}
