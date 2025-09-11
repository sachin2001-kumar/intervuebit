import { UserAnswerDetails } from "@/drizzle/Schema";
import { db } from "@/lib/db";
import { chatSession } from "@/lib/GoogleAIModel";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { mockId: string } }
) {
  console.log("✅ /recordans API route hit with params:", params);

  try {
    const body = await req.json();
    console.log("📩 Incoming body:", body);

    const { UserAns, Question, CorrectAns, Useremail } = body;
    const { mockId } = await params; // no need for await here

    // Validate
    if (!UserAns || !Question || !Useremail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Call Gemini for feedback
    const feedbackPrompt =
      `Question: ${Question}, User Answer: ${UserAns}, Correct Answer: ${CorrectAns}. ` +
      `Please give rating (1–5) and short feedback (3–5 lines) in JSON format { "rating": number, "feedback": string }`;

    let finaljsonfeedbackresp: any = { feedback: "No feedback", rating: null };

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const jsonfeedbackresp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      finaljsonfeedbackresp = JSON.parse(jsonfeedbackresp);
    } catch (parseErr) {
      console.warn("⚠️ Could not parse AI feedback, using default");
    }

    // Debug before insert
    console.log("💾 Saving Answer Payload:", {
      mockIdRef: mockId,
      question: Question,
      correctAns: CorrectAns,
      userAns: UserAns,
      feedback: finaljsonfeedbackresp?.feedback,
      rating: finaljsonfeedbackresp?.rating,
      userEmail: Useremail,
    });

    // Insert into DB
    await db.insert(UserAnswerDetails).values({
      mockIdRef: mockId,
      Question: Question, // ✅ matches schema
      CorrectAns: CorrectAns, // ✅ matches schema
      UserAns: UserAns, // ✅ matches schema
      feedback: finaljsonfeedbackresp?.feedback || "No feedback",
      rating: finaljsonfeedbackresp?.rating || null,
      Useremail: Useremail, // ✅ matches schema
      createdAt: new Date(),
    });

    console.log("✅ Row inserted successfully");

    return NextResponse.json({
      success: true,
      feedback: finaljsonfeedbackresp,
    });
  } catch (err: any) {
    console.error("❌ Error in POST /recordans:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
