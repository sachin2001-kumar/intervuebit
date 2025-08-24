import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const GenerateInterview = () => {
  const router = useRouter();
  const params = useParams();
  const { mockId } = params;
  const [loading, Setloading] = useState(true);

  useEffect(() => {
    const generateQuestion = async () => {
      try {
        const res = await fetch("", {
          method: "POST",
        });
        const data = await res.json();
        if (data.success) {
          router.push(`/interview/${mockId}/start`);
        } else {
          alert("Failed to generate interview questions");
        }
      } catch (err) {
        alert(err);
      }
      Setloading(false);
    };
    generateQuestion();
  }, [mockId, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading ? (
        <p className="text-xl">Generating AI Interview Questions...</p>
      ) : (
        <p className="text-red-500">Something went wrong</p>
      )}
    </div>
  );
};
