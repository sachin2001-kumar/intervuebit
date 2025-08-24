import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { InterviewDetails } from "@/drizzle/Schema";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";
import moment from "moment";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const body = await req.json();

    const { JobTitle, Skills, YearsOfExperience } = body;

    // Insert into table
    const result = await db
      .insert(InterviewDetails)
      .values({
        JobPosition: JobTitle,
        JobDesc: Skills,
        JobExp: YearsOfExperience.toString(),
        mockId: uuidv4(),
        JsonMockResp: "{}",
        createdBy: user?.primaryEmailAddress?.emailAddress ?? "unknown",
        createdAt: new Date(),
      })
      .returning({ mockId: InterviewDetails.mockId });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error in POST /api/interview:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
