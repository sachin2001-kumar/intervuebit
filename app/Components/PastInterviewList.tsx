"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { InterviewDetails } from "@/drizzle/Schema";
import { desc, eq, InferSelectModel } from "drizzle-orm";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { Button } from "@/ui/button";

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

  const { ref } = useSectionInView("Past Interview");

  return (
    <section
      id="Past-Interview"
      ref={ref}
      className="flex m-16 flex-col items-center p-6 border-2 rounded-2xl border-gray-800 max-w-6xl mx-auto bg-[#5b4d57]  scroll-mt-24 shadow-lg hover:shadow-2xl hover:shadow-[#b4a5b4] transition-all"
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ amount: 0.3, once: true }}
        className="flex text-4xl text-center font-extrabold md:text-5xl text-gray-900"
      >
        {" "}
        Past Interviews{" "}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className=" mt-12 gap-10 flex flex-col items-center p-6"
      >
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-medium text-gray-900 text-center"
        >
          We Will Add Login facility soon. Don't go anywhere{" "}
        </motion.p>
        <Button className="flex bg-cyan-700 text-gray-900 hover:bg-cyan-600 font-bold w-fit text-3xl p-6 rounded-2xl">
          Get Started
        </Button>
      </motion.div>
    </section>
  );
};

{
  /* {InterviewList.map((interview) => (
        <div key={interview.id} className="p-2 border-b">
          <p>
            <strong>{interview.JobPosition}</strong> {interview.JobExp} yrs
          </p>
          <p className="text-sm text-gray-500">{interview.JobDesc}</p>
        </div>
      ))} */
}
