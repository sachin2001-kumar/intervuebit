"use client";
import { Button } from "@/ui/button";
import { db } from "@/lib/db";
import { InterviewDetails } from "@/drizzle/Schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";

type InterviewDetail = {
  id: number;
  createdAt: Date;
  JsonMockResp: string;
  JobPosition: string;
  JobDesc: string;
  JobExp: string;
  mockId: string;
  createdBy: string;
};

function Interview({ params }: any) {
  const [interviewData, setInterviewData] = useState<InterviewDetail | null>(
    null
  );
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(InterviewDetails)
      .where(eq(InterviewDetails.mockId, params.interviewId));
    setInterviewData(result[0]);
  };

  return (
    <motion.div
      className="my-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Page Header */}
      <motion.h2
        className="font-bold text-3xl mb-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        🚀 Let’s Get Started
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section */}
        <motion.div
          className="flex flex-col my-5 gap-5"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Job Info Card */}
          <motion.div
            className="flex flex-col p-5 rounded-lg border gap-5 shadow-md bg-white"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h2 className="text-lg">
              <strong>Job Role/Position: </strong>
              {interviewData?.JobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack: </strong>
              {interviewData?.JobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewData?.JobExp}
            </h2>
          </motion.div>

          {/* Info Card */}
          <motion.div
            className="p-5 border rounded-lg border-yellow-300 bg-yellow-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="flex gap-2 items-center text-yellow-600 font-semibold">
              <Lightbulb />
              <span>Information</span>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </motion.div>
        </motion.div>

        {/* Right Section - Webcam */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          {webCamEnabled ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                mirrored={true}
                style={{
                  height: 300,
                  width: 300,
                  borderRadius: "10px",
                  boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <WebcamIcon className="h-72 my-7 border rounded-lg w-full p-20 bg-secondary text-gray-400" />
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  className="w-full"
                  variant="ghost"
                  onClick={() => setWebCamEnabled(true)}
                >
                  Enable Web Cam and Microphone
                </Button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Start Interview Button */}
      <motion.div
        className="flex justify-end items-end mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link href={`/interview/${params.interviewId}/start`}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="px-6 py-2 text-lg font-medium">
              Start Interview
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Interview;
