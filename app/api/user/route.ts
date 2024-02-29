import { NextResponse } from "next/server";
import { connect } from "@/services/connectDB";
import userModel from "@/models/user";
import { compare } from "@/utils/crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (
      !body.username ||
      !body.email ||
      !body.password ||
      !body.key
    ) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "Invalid Information Provided",
        },
        { status: 400 }
      ); // Use a 400 Bad Request status code
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

    if (!body.isValidated) {
      return NextResponse.json(
        {
          error: "Not verified",
          message: "User is not verified",
        },
        { status: 400 }
      ); // Use a 400 Bad Request status code
    }
    connect();
    const foundUser = await userModel.findOne({ email: body.email });
    if (foundUser) {
      return NextResponse.json(
        {
          error: "Conflict",
          message: "This user already exists",
        },
        { status: 409 }
      ); // Use a 409 Conflict status code
    }

    const newUser = new userModel({
      name: body.username,
      email: body.email,
      password: body.password,
    });

    try {
      const userSaveResult = await newUser.save();
      return NextResponse.json(userSaveResult, { status: 201 }); // Use a 201 Created status code
    } catch (error) {
      return NextResponse.json(
        {
          error: "Internal Server Error",
          message: "Failed to create a new user",
        },
        { status: 500 }
      ); // Use a 500 Internal Server Error status code
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "An error occurred while processing the request",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    if (!body.userEmail || !body.key) {
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

    connect();
    const foundUser = await userModel.findOne({ email: body.userEmail });
    if (!foundUser) {
      return NextResponse.json(
        {
          error: "No user found",
          message: "There is no user with this email",
        },
        { status: 409 }
      );
    }
    if (body.email) foundUser.email = body.email;
    if (body.name) foundUser.name = body.name;
    if (body.newPassword && body.oldPassword) {
      if (await compare(body.oldPassword, foundUser.password))
        foundUser.password = body.newPassword;
      else
        return NextResponse.json(
          {
            error: "Bad Request",
            message: "Old Password is wrong.",
          },
          { status: 400 }
        );
    }

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