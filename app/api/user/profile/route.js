// /app/api/user/profile/route.js

import { verifyToken } from "@/lib/auth/token";
import DbConnect from "@/lib/db/DbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const authCookie = req.cookies.get("auth_token");
    if (!authCookie) {
      return NextResponse.json({ user: null, message: "Not Authenticated" }, { status: 401 });
    }

    const token = authCookie.value;
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    await DbConnect();

    const user = await User.findById(payload.user._id).select("-password ");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
