import userModel from "@/models/user";
import { connect } from "@/services/connectDB";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    if (!body.email || !body.password || !body.key) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "Invalid Information Provided",
        },
        { status: 400 }
      );
    }

    if (body.key != process.env.API_KEY) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "Invalid Key Provided",
        },
        { status: 400 }
      );
    }

    if (!body.isValid)
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "Not verified",
        },
        { status: 400 }
      );

    connect();
    const foundUser = await userModel.findOne({ email: body.email });
    if (!foundUser) {
      return NextResponse.json(
        {
          error: "No user found",
          message: "No account exists with this email",
        },
        { status: 409 }
      );
    }
    if (body.password) foundUser.password = body.password;

    foundUser.save();
    return NextResponse.json(foundUser, { status: 200 });
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
