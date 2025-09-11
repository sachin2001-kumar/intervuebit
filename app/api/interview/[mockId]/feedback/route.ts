// pages/api/interview/[mockId]/feedback/route.ts

import { UserAnswerDetails } from "@/drizzle/Schema";
import { db } from "@/lib/db";
import { NextApiRequest } from "next";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { mockId: string } }
) {
  try {
    const { mockId } = await params;
    const result = await db
      .select()
      .from(UserAnswerDetails)
      .where(eq(UserAnswerDetails.mockIdRef, mockId))
      .orderBy(UserAnswerDetails.id);

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, error: "Interview not found" },
        { status: 404 }
      );
    }
    // Return the entire array of results
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error fetching interview:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
