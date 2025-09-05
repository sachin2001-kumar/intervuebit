import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { InterviewDetails } from "@/drizzle/Schema";
import { eq } from "drizzle-orm";

type Params = {
  params: {
    mockId: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  try {
    const { mockId } = await params;

    const result = await db
      .select()
      .from(InterviewDetails)
      .where(eq(InterviewDetails.mockId, mockId));

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, error: "Interview not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    console.error("Error fetching interview:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
