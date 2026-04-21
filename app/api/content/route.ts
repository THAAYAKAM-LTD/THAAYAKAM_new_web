import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getContent, updateContent } from "@/lib/cms";

export async function GET() {
  const content = await getContent();
  if (!content) {
    return NextResponse.json({ success: false, message: "Could not load content" }, { status: 500 });
  }
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  try {
    // Check session
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== "active") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const newContent = await request.json();
    const success = await updateContent(newContent);

    if (success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Failed to update content" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error processing request" }, { status: 500 });
  }
}
