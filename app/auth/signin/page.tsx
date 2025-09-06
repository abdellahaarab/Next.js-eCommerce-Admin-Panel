'use client';

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Sign in to Admin</h1>
      <button
        onClick={() => signIn("google")}
        className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sign in with Google
      </button>
    </div>
  );
}
