import { verifyToken } from "@/lib/auth/token";
import DbConnect from "@/lib/db/DbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const authCookie = req.cookies.get("auth_token");
    if (!authCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const token = authCookie.value;
    const payload = await verifyToken(token);

    if (!payload || payload.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await DbConnect();
    const users = await User.find().select("-password");

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
