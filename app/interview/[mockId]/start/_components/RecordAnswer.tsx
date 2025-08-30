import React from "react";
import { InterviewDetail } from "../page"; // or define the type here
import { Question } from "@/app/interview/[mockId]/start/page";

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
  if (!InterviewQuestion || InterviewQuestion.length === 0)
    return <div>Loading...</div>;

  const currentQuestion = InterviewQuestion[ActiveQuestionIndex];

  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold">
        Answer for Question {ActiveQuestionIndex + 1}:
      </h3>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Type your answer here"
      />
    </div>
  );
};
