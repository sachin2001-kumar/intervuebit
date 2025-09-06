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
    const { mockId } = await params;

    // Make sure all required values exist
    if (!UserAns || !Question || !Useremail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Call Gemini (placeholder feedback)
    const feedbackPrompt = "We will update feedback part soon ......";
    const result = await chatSession.sendMessage(feedbackPrompt);

    let finaljsonfeedbackresp: any = {};
    try {
      const jsonfeedbackresp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      finaljsonfeedbackresp = JSON.parse(jsonfeedbackresp);
    } catch (parseErr) {
      console.warn("⚠️ Could not parse AI feedback, using default");
      finaljsonfeedbackresp = { feedback: feedbackPrompt };
    }

    // Debug before insert
    console.log("💾 Saving Answer Payload:", {
      mockIdRef: mockId,
      Question,
      CorrectAns,
      UserAns,
      Useremail,
    });

    // Insert into DB
    await db.insert(UserAnswerDetails).values({
      mockIdRef: mockId,
      Question,
      CorrectAns,
      UserAns,
      feedback: feedbackPrompt,
      rating: null,
      Useremail,
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
