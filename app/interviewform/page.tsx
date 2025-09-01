"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InterviewFormSchema,
  InterviewFormType,
} from "@/Schema/InterviewFormSchema";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function InterviewForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<InterviewFormType>({
    resolver: zodResolver(InterviewFormSchema),
    defaultValues: {
      JobTitle: "",
      Skills: "",
      YearsOfExperience: 0,
    },
  });

  const onSubmit = async (values: InterviewFormType) => {
    setLoading(true);
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.success) {
        form.reset(); // clear form
        alert("Success");
        router.push(`interview/${data.data[0].mockId}`);
      } else {
        alert("Failed to save interview details");
        router.push(`interview/${data.data[0].mockId}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error saving interview details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <div className="bg-[#6c634f94] rounded-2xl shadow-lg p-8 border-2 border-gray-500">
          <motion.h2
            className="text-2xl font-bold text-center mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Mock Interview Setup
          </motion.h2>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Job Title */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block font-medium mb-1">Job Title</label>
              <input
                type="text"
                placeholder="e.g. Frontend Developer"
                {...form.register("JobTitle")}
                className="w-full p-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {form.formState.errors.JobTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.JobTitle.message}
                </p>
              )}
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block font-medium mb-1">Skills</label>
              <textarea
                placeholder="e.g. HTML, CSS, Java, React.js, Next.js"
                {...form.register("Skills")}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-900 resize-none [&::-webkit-resizer]:appearance-none"
              />
              {form.formState.errors.Skills && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.Skills.message as string}
                </p>
              )}
            </motion.div>

            {/* Years of Experience */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block font-medium mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                placeholder="e.g. 2"
                {...form.register("YearsOfExperience", { valueAsNumber: true })}
                className="w-full p-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              {form.formState.errors.YearsOfExperience && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.YearsOfExperience.message}
                </p>
              )}
            </motion.div>

            {/* Submit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className={`w-full font-semibold py-3 rounded-lg shadow-md transition text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r via-blue-400 to-cyan-700 hover:bg-cyan-600"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoaderCircle className="animate-spin" /> Generating...
                  </span>
                ) : (
                  "Generate Mock Interview"
                )}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
