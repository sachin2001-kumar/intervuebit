"use client";

import { useRouter } from "next/navigation";

export const HomeCom = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Welcome to Mock Interview</h1>
      <button
        onClick={() => router.push("/interviewform")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Add Interview
      </button>
    </div>
  );
};
