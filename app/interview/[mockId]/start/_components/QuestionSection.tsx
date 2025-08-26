import React from "react";

type Question = {
  question: string;
  answer: string;
};

interface QuestionSectionProps {
  InterviewQuestion: Question[];
  QuestionIndex: number;
}

export const QuestionSection = ({
  InterviewQuestion,
  QuestionIndex,
}: QuestionSectionProps) => {
  if (!InterviewQuestion || InterviewQuestion.length === 0)
    return <div>Loading...</div>;

  const currentQuestion = InterviewQuestion[QuestionIndex];

  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold">Question {QuestionIndex + 1}:</h3>
      <p>{currentQuestion.question}</p>
    </div>
  );
};
