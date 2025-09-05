import { InterviewDetails } from "@/drizzle/Schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    mockId: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  // Fetch the interview detail from DB
  const { mockId } = await params;
  const result = await db
    .select()
    .from(InterviewDetails)
    .where(eq(InterviewDetails.mockId, mockId));

  if (!result[0]) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }

  const jsonMockResp = JSON.parse(result[0].JsonMockResp);
  return NextResponse.json({
    ...result[0],
    JsonMockResp: jsonMockResp,
  });
}
