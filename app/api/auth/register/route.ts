import authService from "@/services/authService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, email } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Please provide username, email, and password" },
        { status: 400 },
      );
    }

    const response = await authService.register(username, password, email);

    // Return the JWT token and user data
    return NextResponse.json(
      {
        jwt: response.jwt,
        user: response.user,
      },
      { status: 201 },
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
