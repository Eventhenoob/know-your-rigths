import { NextResponse } from "next/server";

import generateOTP from "@/utils/generateOtp";
import sendMail from "@/utils/sendMail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.email || !body.key)
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "Invalid Information Provided",
        },
        { status: 400 }
      );


    if (body.key != process.env.API_KEY) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "Invalid Key Provided",
        },
        { status: 400 }
      );
    }

    

    const otpCode = generateOTP(6);
    
    await sendMail(body.email, otpCode);

    return NextResponse.json(
      {
        message: "success",
        otpCode,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "An error occurred while processing the request",
      },
      { status: 500 }
    );
  }
}