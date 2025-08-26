import React from "react";
import { InterviewDetail } from "../page"; // or define the type here
import { Question } from "@/app/interview/[mockId]/start/page";

interface RecordAnswerProps {
  InterviewData: InterviewDetail | null;
  InterviewQuestion: Question[];
  QuestionIndex: number;
}

export const RecordAnswer = ({
  InterviewData,
  InterviewQuestion,
  QuestionIndex,
}: RecordAnswerProps) => {
  if (!InterviewQuestion || InterviewQuestion.length === 0)
    return <div>Loading...</div>;

  const currentQuestion = InterviewQuestion[QuestionIndex];

  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold">Answer for Question {QuestionIndex + 1}:</h3>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Type your answer here"
      />
    </div>
  );
};
