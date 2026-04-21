import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USER = "thaayakam-dev";
const ADMIN_PASS = "PASSWord#2026";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Set a session cookie
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "active", {
        httpOnly: true,
        secure: process.env.NODE_SET !== "development",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error processing request" }, { status: 500 });
  }
}
