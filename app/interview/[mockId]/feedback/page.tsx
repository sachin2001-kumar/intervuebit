"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";

interface FeedbackDetail {
  Question: string;
  CorrectAns: string;
  UserAns: string;
  feedback: string;
  rating: string;
}

export default function FeedbackPage() {
  const [feedbackdata, setFeedbackdata] = useState<FeedbackDetail[] | null>(
    null
  );
  const { mockId } = useParams<{ mockId: string }>();

  useEffect(() => {
    const GetFeedback = async () => {
      try {
        const data = await fetch(`/api/interview/${mockId}/feedback`);
        const res = await data.json();
        if (res.success) {
          // Now expecting an array
          setFeedbackdata(res.data);
        }
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    };
    if (mockId) GetFeedback();
  }, [mockId]);

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto h-auto flex flex-col items-center p-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1
        className="font-bold text-3xl bg-gradient-to-r from-pink-500 via-purple-400 to-blue-300 bg-clip-text text-transparent p-2 rounded-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        Interview Feedback
      </motion.h1>
      <motion.div
        className="mt-6 w-full flex flex-col gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {feedbackdata && feedbackdata.length > 0 ? (
          feedbackdata.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <Collapsible className="border-2 border-gray-600 rounded-xl bg-white/10 backdrop-blur-sm shadow-md">
                {/* Trigger */}
                <CollapsibleTrigger className="flex items-center p-4 w-full text-left font-semibold text-gray-100">
                  {/* Question part */}
                  <span className="flex-1 pr-4">
                    Question {index + 1}: {item.Question}
                  </span>
                  <span className="w-px h-auto bg-gray-600 mx-2" />
                  <div className="flex items-center justify-center w-12 h-12">
                    <ChevronsUpDown className="h-6 w-6 text-gray-300" />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 border-t flex flex-col divide-y-2 divide-gray-600 bg-[#bec4c4] rounded-b-xl">
                  <div className="py-2">
                    <p className="text-md text-black">
                      <strong>Your Answer:</strong> {item.UserAns}
                    </p>
                  </div>
                  <div className="py-2">
                    <p className="text-md text-green-700">
                      <strong>Correct Answer:</strong> {item.CorrectAns}
                    </p>
                  </div>
                  <div className="py-2">
                    <p className="text-md text-yellow-900">
                      <strong>Rating:</strong> {item.rating}
                    </p>
                  </div>
                  <div className="py-2">
                    <p className="text-md text-blue-700">
                      <strong>Feedback:</strong> {item.feedback}
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-gray-900 mt-4 text-3xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Wait! we are generating a feedback for you. Don't go anywhere!
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
