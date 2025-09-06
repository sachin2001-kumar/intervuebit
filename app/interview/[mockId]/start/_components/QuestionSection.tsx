"use client";

import { Lightbulb, Volume2, VolumeX } from "lucide-react";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

type Question = {
  question: string;
  answer: string;
};

interface QuestionSectionProps {
  InterviewQuestion: Question[];
  ActiveQuestionIndex: number;
}

export const QuestionSection = ({
  InterviewQuestion,
  ActiveQuestionIndex,
}: QuestionSectionProps) => {
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const textToSpeech = (text: string) => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  return (
    InterviewQuestion && (
      <motion.div
        className="p-5 border-gray-800 rounded-lg bg-white/10 backdrop-blur-md shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {InterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={` p-2 rounded-md text-lg md:text-sm text-center cursor-pointer flex items-center justify-center font-semibold transition-colors duration-300 ${
                ActiveQuestionIndex === index
                  ? "bg-cyan-500 text-black"
                  : "bg-cyan-700 text-gray-800"
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>

        <h2 className="flex my-5 text-xl md:text-xl font-medium text-gray-900">
          {InterviewQuestion[ActiveQuestionIndex]?.question}
        </h2>

        <div className="flex items-center gap-2 mb-5">
          {speaking ? (
            <Volume2
              className="cursor-pointer text-black"
              onClick={() =>
                textToSpeech(InterviewQuestion[ActiveQuestionIndex]?.question)
              }
            />
          ) : (
            <VolumeX
              className="cursor-pointer text-black"
              onClick={() =>
                textToSpeech(InterviewQuestion[ActiveQuestionIndex]?.question)
              }
            />
          )}
        </div>

        <div className="border-2 border-gray-800 rounded-lg p-5 bg-blue-100/20 mt-5">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Lightbulb />
            <span>Note:</span>
            <span className="font-normal">
              {process.env.NEXT_PUBLIC_QUESTION_NOTE ||
                "Every Question's Answer is required!"}
            </span>
          </div>
        </div>
      </motion.div>
    )
  );
};
