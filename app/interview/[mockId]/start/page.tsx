"use client";

import React, { useEffect, useState } from "react";
import { QuestionSection } from "./_components/QuestionSection";
import { RecordAnswer } from "./_components/RecordAnswer";
import { Button } from "@/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

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

interface StartInterviewProps {
  params: { mockId: string };
}

const StartInterview = ({ params }: StartInterviewProps) => {
  const { mockId } = useParams<{ mockId: string }>();
  const [ActiveQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [interviewQuestion, setInterviewQuestion] = useState<Question[]>([]);
  const [interviewData, setInterviewData] = useState<InterviewDetail | null>(
    null
  );

  useEffect(() => {
    getInterviewDetails();
  }, [mockId]);

  const getInterviewDetails = async () => {
    try {
      const result = await fetch(`/api/interview/${mockId}/start`);
      const data = await result.json();

      // Parse JsonMockResp string to array
      if (data.JsonMockResp) {
        setInterviewQuestion(JSON.parse(data.JsonMockResp));
      }

      setInterviewData(data);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionSection
          InterviewQuestion={interviewQuestion}
          ActiveQuestionIndex={ActiveQuestionIndex}
        />
        <RecordAnswer
          InterviewData={interviewData}
          InterviewQuestion={interviewQuestion}
          ActiveQuestionIndex={ActiveQuestionIndex}
        />
      </div>

      <div className="flex justify-end gap-6 mt-4">
        {ActiveQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(ActiveQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}

        {ActiveQuestionIndex < (interviewQuestion?.length ?? 0) - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(ActiveQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}

        {ActiveQuestionIndex === (interviewQuestion?.length ?? 0) - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
