"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCredentials } from "../store/user/userSlice";

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44337/api/auth/login",
        {
          email,
          password,
        }
      );

      dispatch(setCredentials(response.data));
      localStorage.setItem("token", response.data.token);
      alert("Login başarılı!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Login hatası!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md flex flex-col gap-3"
      >
        <h2 className="text-xl font-bold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 px-3 py-1 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 px-3 py-1 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-gray-500"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
