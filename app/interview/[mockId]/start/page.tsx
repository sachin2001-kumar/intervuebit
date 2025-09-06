"use client";

import React, { useEffect, useState } from "react";
import { QuestionSection } from "./_components/QuestionSection";
import { RecordAnswer } from "./_components/RecordAnswer";
import { Button } from "@/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export type Question = {
  question: string;
  answer: string;
};

export type InterviewDetail = {
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

const StartInterview = () => {
  const { mockId } = useParams<{ mockId: string }>();
  const [ActiveQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [interviewQuestion, setInterviewQuestion] = useState<Question[]>([]);
  const [interviewData, setInterviewData] = useState<InterviewDetail | null>(
    null
  );

  useEffect(() => {
    const getInterviewDetails = async () => {
      try {
        const result = await fetch(`/api/interview/${mockId}/start`);
        const data = await result.json();

        if (data.JsonMockResp) setInterviewQuestion(data.JsonMockResp);
        setInterviewData(data);
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    };

    if (mockId) getInterviewDetails();
  }, [mockId]);

  return (
    <motion.div
      className="flex flex-col min-h-screen px-4 py-10 bg-transparent"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {/* Header */}
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-10"
        variants={fadeInUp}
      >
        🚀 Interview Session
      </motion.h1>

      {/* Middle Section - Dynamic & Centered */}
      <motion.div
        className="flex-1 flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto w-full border-gray-800 rounded-2xl p-6 bg-[#6d6c66] shadow-md shadow-gray-700"
        variants={fadeInUp}
      >
        {/* Left Section - Questions */}
        <div className="flex-1 flex flex-col gap-6 p-2">
          <QuestionSection
            InterviewQuestion={interviewQuestion}
            ActiveQuestionIndex={ActiveQuestionIndex}
          />
        </div>

        {/* Right Section - Record Answer */}
        <div className="flex-1 flex flex-col gap-6 p-2">
          <RecordAnswer
            InterviewData={interviewData}
            InterviewQuestion={interviewQuestion}
            ActiveQuestionIndex={ActiveQuestionIndex}
          />
        </div>
      </motion.div>

      {/* Navigation Buttons - Static at bottom */}
      <motion.div
        className="flex justify-end gap-6 mt-6 max-w-6xl w-full mx-auto"
        variants={fadeInUp}
      >
        {ActiveQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(ActiveQuestionIndex - 1)}
            className="shadow-md shadow-gray-800"
          >
            Previous Question
          </Button>
        )}

        {ActiveQuestionIndex < (interviewQuestion?.length ?? 0) - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(ActiveQuestionIndex + 1)}
            className="shadow-md shadow-gray-800"
          >
            Next Question
          </Button>
        )}

        {ActiveQuestionIndex === (interviewQuestion?.length ?? 0) - 1 && (
          <Link href={`/interview/${mockId}/feedback`}>
            <Button className="shadow-md shadow-gray-800">End Interview</Button>
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
};

export default StartInterview;
