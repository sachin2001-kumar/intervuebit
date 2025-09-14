import { db } from "@/lib/db";
import { UserInterviews } from "@/drizzle/Schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { mockId: string } }
) {
  try {
    const { mockId } = await params;

    const interviews = await db.query.UserInterviews.findMany({
      where: eq(UserInterviews.mockIdRef, mockId),
    });

    // Flatten qaPairs across all interview rows
    const qaPairs = interviews.flatMap((row) => row.qaPairs || []);

    return NextResponse.json({ success: true, data: qaPairs });
  } catch (err: any) {
    console.error("Error fetching feedback:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
