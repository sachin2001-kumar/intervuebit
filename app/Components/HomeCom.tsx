"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Bot, Zap, CheckCircle2 } from "lucide-react";
import { useSectionInView } from "@/lib/hooks";

export const HomeCom = () => {
  const router = useRouter();
  const { ref } = useSectionInView("Home", 0.5);

  return (
    <div
      id="Home"
      ref={ref}
      className="container mx-auto px-4 text-center relative z-10 m-4 scroll-mt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-4xl mx-auto mt-20 bg-transparent"
      >
        {/* Tagline */}
        <div className="inline-flex items-center space-x-2 border border-indigo-500/30 rounded-full px-4 py-2 mb-8 shadow-sm bg-cyan-500">
          <Sparkles className="h-4 w-4 text-indigo-900" />
          <span className="text-sm font-medium text-gray-800">
            Practice Smarter, Interview Better
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI-Powered
          </span>
          <br />
          <span className="text-gray-900">Mock Interview</span>
          <br />
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Platform
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-900 mb-10 max-w-2xl mx-auto leading-relaxed text-center">
          Sharpen your interview skills with real-time AI feedback, personalized
          questions, and detailed performance analytics. Gain confidence and
          prepare for success in your dream job interviews.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={() => router.push("/interviewform")}
            className="group bg-gradient-to-r from-cyan-400 via-emerald-500 to-fuchsia-100 px-8 py-4 rounded-lg text-white font-semibold text-lg hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 flex items-center space-x-2"
          >
            <span>🚀 Add Interview</span>
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center space-x-2 border border-indigo-500/20 rounded-full px-4 py-2 shadow-sm bg-gradient-to-r via-blue-200 to-purple-300">
            <Bot className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-medium text-black">
              AI-Driven Practice
            </span>
          </div>
          <div className="flex items-center space-x-2 border border-purple-500/20 rounded-full px-4 py-2 shadow-sm bg-gradient-to-r via-blue-200 to-purple-300">
            <Zap className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-black">
              Instant Feedback
            </span>
          </div>
          <div className="flex items-center space-x-2 border border-blue-500/20 rounded-full px-4 py-2 shadow-sm bg-gradient-to-r via-blue-200 to-purple-300">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-black">
              Confidence Boost
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
