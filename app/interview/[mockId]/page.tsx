"use client";

import { useParams } from "next/navigation";
import { Button } from "@/ui/button";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";

type InterviewDetail = {
  id: number;
  createdAt: string;
  JsonMockResp: string;
  JobPosition: string;
  JobDesc: string;
  JobExp: string;
  mockId: string;
  createdBy: string;
};

// Animation Variants
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};
const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

function Interview() {
  const { mockId } = useParams<{ mockId: string }>(); // ✅ useParams hook
  const [interviewData, setInterviewData] = useState<InterviewDetail | null>(
    null
  );
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    const GetInterviewDetails = async () => {
      try {
        const result = await fetch(`/api/interview/${mockId}`);
        const data = await result.json();
        if (data.success) {
          setInterviewData(data.data);
        }
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    };

    if (mockId) GetInterviewDetails();
  }, [mockId]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-transparent"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <motion.h1
        className="text-3xl md:text-3xl font-extrabold text-gray-100 text-center mb-6"
        variants={fadeInUp}
      >
        🚀 Let's Get Started
      </motion.h1>

      {/* Main Card */}
      <motion.div
        className="w-full max-w-6xl border border-gray-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-12 bg-white/10 backdrop-blur-md shadow-lg"
        variants={fadeInUp}
      >
        {/* Left Section - Job Info & Tips */}
        <motion.div
          className="flex-1 flex flex-col gap-6 justify-center"
          variants={fadeInLeft}
        >
          {/* Job Info */}
          <motion.div
            variants={fadeInUp}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
            className="p-6 rounded-2xl border border-gray-300 flex flex-col gap-4 bg-neutral-600 backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold text-gray-100">Role:</h3>
            <p className="text-gray-200 font-medium">
              {interviewData?.JobPosition}
            </p>

            <h3 className="text-lg font-semibold text-gray-100 mt-3">
              Tech Stack:
            </h3>
            <p className="text-gray-200 font-medium">
              {interviewData?.JobDesc}
            </p>

            <h3 className="text-lg font-semibold text-gray-100 mt-3">
              Experience:
            </h3>
            <p className="text-gray-200 font-medium">
              {interviewData?.JobExp} years
            </p>
          </motion.div>

          {/* Tips & Info */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl border-l-4 border-yellow-400 bg-cyan-600 backdrop-blur-sm flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 text-yellow-500 font-semibold">
              <Lightbulb size={22} />
              <span>Tips & Info</span>
            </div>
            <p className="text-gray-900 text-sm leading-relaxed font-semibold">
              {process.env.NEXT_PUBLIC_INFORMATION ||
                "This platform empowers job seekers to practice interviews in a realistic environment. Get personalized guidance, simulate real scenarios, and improve your confidence before the real interview."}
            </p>
          </motion.div>
        </motion.div>

        {/* Right Section - Webcam */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center gap-6"
          variants={fadeInRight}
        >
          {webCamEnabled ? (
            <motion.div
              variants={scaleIn}
              className="w-full max-w-sm rounded-2xl border border-gray-300 overflow-hidden bg-white/10 backdrop-blur-md"
            >
              <Webcam
                mirrored
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                style={{ width: "100%", height: "360px", objectFit: "cover" }}
              />
            </motion.div>
          ) : (
            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center gap-6 w-full max-w-sm"
            >
              <div className="w-full h-72 rounded-2xl border border-gray-300 flex items-center justify-center bg-white/10 backdrop-blur-md">
                <WebcamIcon className="h-20 w-20 text-gray-800" />
              </div>
              <Button
                variant="default"
                className="w-full py-5 text-lg font-semibold text-gray-950 hover:bg-cyan-700 bg-gradient-to-l via-cyan-400 to-blue-600"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Webcam & Microphone
              </Button>
            </motion.div>
          )}

          {/* Start Interview Button inside Right Section */}
          <Link
            href={`/interview/${mockId}/start`}
            className="w-full flex justify-end mt-6"
          >
            <Button
              variant="default"
              className="w-fit border-2 border-gray-900 py-6 text-lg font-semibold shadow-lg justify-end bg-gradient-to-l via-emerald-400 to-cyan-500 text-black"
            >
              Start Interview
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Interview;
