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

    const inputPrompt = `Job position: ${JobTitle}, Job Description: ${Skills}, Years of Experience: ${YearsOfExperience}.
Generate ${
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5
    } interview questions with answers in JSON format like:
[
  {"question": "Q1", "answer": "A1"},
  {"question": "Q2", "answer": "A2"}
]`;

    // ✅ Use chatSession.sendMessage, not chatSession()
    const result = await chatSession.sendMessage(inputPrompt);
    const responseText = result.response.text();

    console.log("Gemini AI Response:", responseText);
    let cleanText = responseText.replace(/```json|```/g, "").trim();

    // ✅ Extract the first valid JSON array safely
    const startIdx = cleanText.indexOf("[");
    const endIdx = cleanText.lastIndexOf("]");

    if (startIdx === -1 || endIdx === -1) {
      throw new Error("No valid JSON array found in AI response");
    }

    let jsonString = cleanText.substring(startIdx, endIdx + 1);

    // ✅ Fix common JSON issues (like trailing commas)
    jsonString = jsonString.replace(/,\s*([\]}])/g, "$1");

    let jsonResp;
    try {
      jsonResp = JSON.parse(jsonString);
    } catch (err) {
      console.error("Failed to parse AI JSON:", jsonString);
      throw new Error("AI response is not valid JSON");
    }

    const email =
      user?.primaryEmailAddress?.emailAddress ||
      user?.emailAddresses?.[0]?.emailAddress ||
      "unknown";

    const resultDb = await db
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

    return NextResponse.json({ success: true, data: resultDb });
  } catch (error: any) {
    console.error("Error in POST /api/interview:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
