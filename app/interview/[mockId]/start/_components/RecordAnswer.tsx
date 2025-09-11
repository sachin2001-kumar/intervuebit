"use client";

import React, { useState, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { InterviewDetail } from "../page";
import { Question } from "@/app/interview/[mockId]/start/page";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Mic, StopCircle } from "lucide-react";
import { Button } from "@/ui/button";
import Webcam from "react-webcam";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

interface RecordAnswerProps {
  InterviewData: InterviewDetail | null;
  InterviewQuestion: Question[];
  ActiveQuestionIndex: number;
}

export const RecordAnswer = ({
  InterviewData,
  InterviewQuestion,
  ActiveQuestionIndex,
}: RecordAnswerProps) => {
  const { mockId } = useParams<{ mockId: string }>();
  const { user } = useUser();
  const webcamRef = useRef<Webcam>(null);
  const [loading, setLoading] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startStopRecording = async () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setTimeout(() => updateAnswer(transcript), 500);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const updateAnswer = async (transcribedText: string) => {
    setLoading(true);
    const finalAnswer = transcribedText.trim()
      ? transcribedText
      : "you answer is not recorded in the";

    try {
      const response = await fetch(`/api/interview/${mockId}/recordans`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Question: InterviewQuestion[ActiveQuestionIndex]?.question,
          CorrectAns: InterviewQuestion[ActiveQuestionIndex]?.answer,
          UserAns: finalAnswer,
          Useremail: user?.primaryEmailAddress?.emailAddress,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast("Answer recorded successfully!");
        resetTranscript();
      } else {
        toast("Error saving answer: " + data.error);
      }
    } catch (err) {
      console.error("Failed to fetch:", err);
      toast("Failed to save answer.");
    } finally {
      setLoading(false);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-white text-center p-4 bg-red-500/50 rounded-lg">
        <p>
          Oops, your browser does not support speech recognition. Please try
          again using Google Chrome.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center gap-6 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full max-w-sm rounded-2xl border-2 border-gray-800 overflow-hidden bg-white/10 backdrop-blur-md h-72">
        <Webcam
          ref={webcamRef}
          mirrored
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <Button
        disabled={loading}
        onClick={startStopRecording}
        className={`w-fit flex items-center gap-2 px-4 py-6 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
          listening
            ? "bg-red-600 text-white animate-pulse"
            : "bg-cyan-700 text-black hover:bg-cyan-800"
        } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {listening ? (
          <>
            <StopCircle className="w-5 h-5" />
            <span>Stop Recording</span>
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" />
            <span>Record Answer</span>
          </>
        )}
      </Button>

      {transcript && (
        <div className="mt-4 p-4 w-full max-w-sm bg-gray-900/50 rounded-lg border border-gray-700">
          <p className="text-gray-300">{transcript}</p>
        </div>
      )}
    </motion.div>
  );
};
