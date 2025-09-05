import { UserAnswerDetails } from "@/drizzle/Schema";
import { db } from "@/lib/db";
import { chatSession } from "@/lib/GoogleAIModel";
import { NextResponse } from "next/server";
import { json } from "zod";

export async function POST(
  req: Request,
  { params }: { params: { mockId: string } }
) {
  const body = await req.json();
  const { UserAns, Question, CorrectAns, Useremail } = body;
  const { mockId } = params;
  try {
    const feedback = "We will update feedback part soon ......";
    const result = await chatSession.sendMessage(feedback);
    const jsonfeedbackresp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    const finaljsonfeedbackresp = JSON.parse(jsonfeedbackresp);
    const resultDB = await db.insert(UserAnswerDetails).values({
      mockIdRef: mockId,
      Question,
      CorrectAns,
      UserAns,
      feedback: finaljsonfeedbackresp?.feedback,
      rating: finaljsonfeedbackresp?.rating,
      Useremail,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      feedback: finaljsonfeedbackresp,
    });
  } catch (err: any) {
    console.error(" Error in POST /Recordans:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
