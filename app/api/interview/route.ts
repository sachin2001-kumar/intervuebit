import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { InterviewDetails } from "@/drizzle/Schema";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";
import moment from "moment";
import { chatSession } from "@/lib/ChatgptAIModel";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const body = await req.json();

    const { JobTitle, Skills, YearsOfExperience } = body;

    // Create AI Prompt for Question and Answer
    const inputprompt = `Job Postion: ${JobTitle}, SKills:${Skills} and year of exprience:${YearsOfExperience} Based on this generate ${
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 10
    } technical interview questions and answers in Json format. and questions should be like a professional is whose exprience means the interviewer(who taking the interview ) is :${
      YearsOfExperience + 5
    } in that field and provide me questions related to each skills and answer should be level of that year of exprience and all of this in json format like Example:
    [
      {"question": "Your question here", "answer": "Your answer here"},
      ...
    ]`;

    //Calling the OPEN AI
    // const chatresult = await chatSession.sendMessage(inputprompt);
    const responseText = await chatSession([
      { role: "user", content: inputprompt },
    ]);

    // Extarct JSON array from AI Response
    const jsonmatch = responseText?.match(/\[([\s\S]*?)\]/);
    if (!jsonmatch) {
      throw new Error("No valid JSON found from AI response");
    }
    const jsonResp = JSON.parse(jsonmatch[0]);

    // Insert into table
    const result = await db
      .insert(InterviewDetails)
      .values({
        JobPosition: JobTitle,
        JobDesc: Skills,
        JobExp: YearsOfExperience.toString(),
        mockId: uuidv4(),
        JsonMockResp: JSON.stringify(jsonResp),
        createdBy: user?.primaryEmailAddress?.emailAddress ?? "unknown",
        createdAt: new Date(),
      })
      .returning({ mockId: InterviewDetails.mockId });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error in POST /api/interview:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
