import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { success } from "zod";
import { fa } from "zod/v4/locales";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POSt(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // verified sender email
      to: process.env.EMAIL_TO!, // your Gmail
      replyTo: email, // optional: user email for reply
      subject: `Email from the AI-Powered Mock Interview Platform `,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email send Successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to send Message", err },
      { status: 500 }
    );
  }
}
