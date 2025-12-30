import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Send email using Resend
    // Note: Free tier only allows sending to your verified email address
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Movmash <onboarding@resend.dev>",
      to: process.env.RESEND_TO_EMAIL || "movmash.official@gmail.com",
      replyTo: email,
      subject: `Contact Form: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e11d48; margin-bottom: 20px;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          <div style="background: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #e11d48;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #666; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      
      // Provide more helpful error messages
      let errorMessage = "Failed to send email. Please try again later.";
      if (error.message?.includes("only send testing emails to your own email")) {
        errorMessage = "Please update RESEND_TO_EMAIL in .env.local to your verified email address (movmash.official@gmail.com)";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

