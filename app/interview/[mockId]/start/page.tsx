"use client";

import React, { useEffect, useState } from "react";
import { QuestionSection } from "./_components/QuestionSection";
import { RecordAnswer } from "./_components/RecordAnswer";
import { Button } from "@/ui/button";

type InterviewDetail = {
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

export const StartInterview = ({ params }: StartInterviewProps) => {
  const [QuestionIndex, setQuestionIndex] = useState(0);
  const [InterviewQuestion, setInterviewQuestion] = useState();
  const [InterviewData, setInterviewData] = useState<InterviewDetail | null>(
    null
  );

  useEffect(() => {
    getInterviewDetails();
  }, [params.mockId]);

  const getInterviewDetails = async () => {
    try {
      const result = await fetch(`/api/interview/${params.mockId}/start`);
      const data = await result.json();

      // Ensure JsonMockResp exists
      if (data.JsonMockResp) {
        setInterviewQuestion(data.JsonMockResp);
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
          InterviewQuestion={InterviewQuestion}
          QuestionIndex={QuestionIndex}
        />
        <RecordAnswer
          InterviewData={InterviewData}
          InterviewQuestion={InterviewQuestion}
          QuestionIndex={QuestionIndex}
        />
      </div>
      <div className="flex justify-end gap-6">
        {QuestionIndex > 0 && (
          <Button onClick={() => setQuestionIndex(QuestionIndex - 1)}>
            Previous Question
          </Button>
        )}
        {QuestionIndex != InterviewQuestion?.length - 1 && (
          <Button onClick={() => setQuestionIndex(QuestionIndex + 1)}>
            Next Questions
          </Button>
        )}
      </div>
    </div>
  );
};
