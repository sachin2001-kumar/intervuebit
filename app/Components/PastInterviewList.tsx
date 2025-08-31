"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { InterviewDetails } from "@/drizzle/Schema";
import { desc, eq, InferSelectModel } from "drizzle-orm";

type InterviewDetailsType = InferSelectModel<typeof InterviewDetails>;

export const PastInterviewList = () => {
  // const user = useUser();
  // const [InterviewList, SetInterviewList] = useState<InterviewDetailsType[]>(
  //   []
  // );

  // useEffect(() => {
  //   if (user) GetInterviewList();
  // }, [user]);

  // const GetInterviewList = async () => {
  //   const data = await db
  //     .select()
  //     .from(InterviewDetails)
  //     .orderBy(desc(InterviewDetails.id));

  //   console.log("Fetched interviews:", data);
  //   SetInterviewList(data);
  // };

  return (
    <div className="flex max-w-6xl mx-auto h-[45rem] bg-green-300 min-h-screen">
      {/* {InterviewList.map((interview) => (
        <div key={interview.id} className="p-2 border-b">
          <p>
            <strong>{interview.JobPosition}</strong> {interview.JobExp} yrs
          </p>
          <p className="text-sm text-gray-500">{interview.JobDesc}</p>
        </div>
      ))} */}
      <h1 className="flex text-black font-extrabold text-6xl items-center justify-center">
        Past Interview ......
      </h1>
    </div>
  );
};
