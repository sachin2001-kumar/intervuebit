import { UserAnswerDetails } from "@/drizzle/Schema";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { mockId: string } }
) {
  try {
    const user = await currentUser();
    const { mockId } = await params;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email =
      user?.primaryEmailAddress?.emailAddress ||
      user?.emailAddresses?.[0]?.emailAddress ||
      "unknown";

    const inserted = await db
      .insert(UserAnswerDetails)
      .values({
        mockIdRef: mockId,
        Question: "This is your question",
        CorrectAns: "This is correct answer",
        UserAns: "This is User Ans",
        feedback: "feedback",
        rating: "This is rating",
        createdAt: new Date(),
        Useremail: email,
      })
      .returning(); // return inserted row(s)

    return NextResponse.json(
      { message: "Answer saved successfully", data: inserted },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error inserting UserAnswerDetails:", error);
    return NextResponse.json(
      { error: "Failed to save answer", details: error.message },
      { status: 500 }
    );
  }
}
