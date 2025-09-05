"use client";

import React, { useEffect, useState } from "react";
import { InterviewDetail } from "../page";
import useSpeechToText from "react-hook-speech-to-text";
import { Question } from "@/app/interview/[mockId]/start/page";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import Image from "next/image";
import { Mic, StopCircle } from "lucide-react";
import { Button } from "@/ui/button";

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
  const [loading, Setloading] = useState(false);
  const [useranswer, Setuseranswer] = useState("");
  const { user } = useUser();
  const {
    error,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
    results,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.forEach((result) => {
      if (typeof result !== "string" && "transcript" in result) {
        Setuseranswer((prevAns) => prevAns + result.transcript);
      } else if (typeof result === "string") {
        Setuseranswer((prevAns) => prevAns + result);
      }
    });
  }, [results]);
  useEffect(() => {
    if (!isRecording && useranswer.length > 5) {
      UpdateAnswer();
    }
  }, [useranswer]);

  const startsstoprecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateAnswer = async () => {
    console.log("User Answer:", useranswer);
    Setloading(true);
    try {
      const response = await fetch("", {
        method: "post",
        body: JSON.stringify({
          Question: InterviewQuestion[ActiveQuestionIndex]?.question,
          CorrectAns: InterviewQuestion[ActiveQuestionIndex]?.answer,
          UserAns: useranswer,
          Useremail: user?.primaryEmailAddress?.emailAddress,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast("User Answer recorded successfully");
        Setuseranswer(""), setResults([]);
      } else {
        toast("Error: " + data.error);
      }
    } catch (err) {
      console.error("Error saving answer:", err);
      toast("Failed to save answer");
    } finally {
      Setloading(false);
    }
  };

  if (error) return <p>Web Speech API is not available in this browser</p>;

  return (
    <div className="flex justify-cente items-center flex-col">
      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam"
          priority
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={startsstoprecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 items-center animate-pulse flex gap-2">
            <StopCircle /> Stop Recording...
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
};
