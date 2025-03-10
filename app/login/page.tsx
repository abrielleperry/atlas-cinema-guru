"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <img
          src="/logo.png"
          alt="Atlas School Logo"
          className="mx-auto mb-8 w-32 h-auto"
        />

        <h1 className="text-2xl font-bold mb-4 text-gray-900">
          Welcome to Cinema Guru
        </h1>
        <p className="mb-6 text-gray-600">Sign in to continue</p>

        <button
          onClick={() => signIn("github")}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234C6.755 20.482 6.065 18.93 6.065 18.93c-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.776.42-1.305.762-1.605-4.665-.528-9.555-2.332-9.555-10.379 0-2.292.822-4.165 2.165-5.637-.217-.528-.942-2.653.207-5.527 0 0 1.77-.566 5.8 2.16A20.3 20.3 0 0 1 12 6.844a20.29 20.29 0 0 1 5.29-.716c4.03-2.726 5.797-2.16 5.797-2.16 1.152 2.874.426 5 .21 5.527 1.345 1.472 2.163 3.345 2.163 5.637 0 8.066-4.897 9.847-9.567 10.367.431.371.815 1.102.815 2.222v3.293c0 .321.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
