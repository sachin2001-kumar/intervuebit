"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const [isRecording, setIsRecording] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  // Start/Stop Recording
  const startStopRecording = async () => {
    if (isRecording) {
      mediaRecorder?.stop();
      setIsRecording(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

      recorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          await sendAudioToTranscribe(event.data);
        }
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    }
  };

  // Send audio to backend for transcription
  const sendAudioToTranscribe = async (audioBlob: Blob) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");

    try {
      const res = await fetch(`/api/interview/${mockId}/transcribe`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setUserAnswer((prev) => prev + " " + data.text);
        await updateAnswer(data.text);
      } else {
        toast("Error in transcription: " + data.error);
      }
    } catch (err) {
      console.error(err);
      toast("Failed to transcribe");
    } finally {
      setLoading(false);
    }
  };

  // Save to DB
  const updateAnswer = async (transcribedText: string) => {
    try {
      const response = await fetch(
        `/api/interview/${mockId}/start/_components`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Question: InterviewQuestion[ActiveQuestionIndex]?.question,
            CorrectAns: InterviewQuestion[ActiveQuestionIndex]?.answer,
            UserAns: transcribedText,
            Useremail: user?.primaryEmailAddress?.emailAddress,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast("Answer recorded successfully");
        setUserAnswer("");
      } else {
        toast("Error saving answer: " + data.error);
      }
    } catch (err) {
      console.error(err);
      toast("Failed to save answer");
    }
  };

  return (
    <motion.div
      className="flex flex-col gap-6 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Webcam */}
      <div className="w-full max-w-sm rounded-2xl border-2 border-gray-800 overflow-hidden bg-white/10 backdrop-blur-md h-72">
        <Webcam
          ref={webcamRef}
          mirrored
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Record Button */}
      <Button
        disabled={loading}
        onClick={startStopRecording}
        className={`w-fit flex items-center gap-2 py-6 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
          isRecording
            ? "bg-red-600 text-white animate-pulse"
            : "bg-cyan-700 text-black hover:bg-cyan-800"
        } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {isRecording ? (
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
    </motion.div>
  );
};
