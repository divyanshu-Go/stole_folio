// app/api/containers/user/route.js
import { NextResponse } from "next/server";
import DbConnect from "@/lib/db/DbConnect";
import { verifyToken } from "@/lib/auth/token";
import User from "@/models/user";
import Container from "@/models/Container";

export async function GET(request) {
  try {
    // 🔹 Check authentication
    const authCookie = request.cookies.get("auth_token");
    if (!authCookie) {
      return NextResponse.json(
        { success: false, error: "Not Authenticated" },
        { status: 401 }
      );
    }

    const token = authCookie.value;
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    await DbConnect();

    const user = await User.findById(payload.user._id).select("_id");
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // 🔹 Get containers where author = user._id
    const userContainers = await Container.find({ author: user._id, isPublished: true })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: userContainers.length,
      data: userContainers,
    });

  } catch (error) {
    console.error("Error fetching user containers:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
