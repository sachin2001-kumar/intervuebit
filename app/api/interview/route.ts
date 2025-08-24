// app/api/interview/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { InterviewDetails } from "@/drizzle/Schema";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";
import { chatSession } from "@/lib/GoogleAIModel";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const body = await req.json();
    const { JobTitle, Skills, YearsOfExperience } = body;

    if (!JobTitle || !Skills || YearsOfExperience === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Construct input prompt (from your reference project)
    const inputPrompt = `Job position: ${JobTitle}, Job Description: ${Skills}, Years of Experience: ${YearsOfExperience}. 
Depends on Job Position, Job Description, and Years of Experience. Generate ${
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5
    } interview questions along with answers in JSON format. 
Each question and answer should be in the format:
[
  {"question": "Your question here", "answer": "Your answer here"},
  ...
]`;

    //  Google Gemini chatSession
    const responseText = await chatSession([inputPrompt]);

    console.log("Gemini AI Response:", responseText);

    const jsonMatch = responseText?.match(/\[([\s\S]*?)\]/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found from AI response");
    }
    const jsonResp = JSON.parse(jsonMatch[0]);

    // user email from Clerk
    const email =
      user?.primaryEmailAddress?.emailAddress ||
      user?.emailAddresses?.[0]?.emailAddress ||
      "unknown";

    //Insert database
    const result = await db
      .insert(InterviewDetails)
      .values({
        JobPosition: JobTitle,
        JobDesc: Skills,
        JobExp: YearsOfExperience.toString(),
        mockId: uuidv4(),
        JsonMockResp: JSON.stringify(jsonResp),
        createdBy: email,
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
