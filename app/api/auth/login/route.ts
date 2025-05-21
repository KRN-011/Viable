import authService from "@/services/authService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        {
          message: "Please provide identifier and password",
        },
        { status: 400 },
      );
    }

    const response = await authService.login(identifier, password);

    return NextResponse.json(
      {
        jwt: response.jwt,
        user: response.user,
      },
      { status: 200 },
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      {
        message: err.message || "Login failed",
      },
      { status: 400 },
    );
  }
}
