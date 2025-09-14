import { UserInterviews } from "@/drizzle/Schema";
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

    const { Useremail, qaPairs } = body;
    if (!qaPairs || qaPairs.length === 0) {
      return NextResponse.json({ error: "Missing qaPairs" }, { status: 400 });
    }

    const { Question, CorrectAns, UserAns } = qaPairs[0];
    const { mockId } = params;

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
      Question,
      CorrectAns,
      UserAns,
      feedback: finaljsonfeedbackresp?.feedback,
      rating: finaljsonfeedbackresp?.rating,
      Useremail,
    });

    // Insert into DB
    await db.insert(UserInterviews).values({
      mockIdRef: mockId,
      Useremail,
      qaPairs: [
        {
          Question,
          CorrectAns,
          UserAns,
          feedback: finaljsonfeedbackresp?.feedback || "No feedback",
          rating: finaljsonfeedbackresp?.rating || null,
        },
      ],
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
