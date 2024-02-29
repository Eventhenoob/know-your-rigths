import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env?.CHAT_API_KEY || "" });

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.key || !body.prompt)
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

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: body.prompt,
        },
      ],

      max_tokens: 150,
    });

    return NextResponse.json(
      { data: response.choices[0].message.content + "$" },
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
