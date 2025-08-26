import { InterviewDetails } from "@/drizzle/Schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { mockId: string } }
) {
  const result = await db
    .select()
    .from(InterviewDetails)
    .where(eq(InterviewDetails.mockId, params.mockId));

  return NextResponse.json(result[0] ?? {});
}
