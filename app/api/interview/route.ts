import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { InterviewDetails } from "@/drizzle/Schema";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
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
      })
      .returning();

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
