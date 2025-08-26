import { InterviewDetails } from "@/drizzle/Schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { mockId: string } }
) {
  // Fetch the interview detail from DB
  const result = await db
    .select()
    .from(InterviewDetails)
    .where(eq(InterviewDetails.mockId, params.mockId));

  if (!result[0]) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }

  const jsonMockResp = JSON.parse(result[0].JsonMockResp);
  return NextResponse.json({
    ...result[0],
    JsonMockResp: jsonMockResp,
  });
}
