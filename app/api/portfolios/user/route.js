// app/api/portfolio/user/route.js
import { NextResponse } from "next/server";
import DbConnect from "@/lib/db/DbConnect";
import { verifyToken } from "@/lib/auth/token";
import User from "@/models/user";
import Portfolio from "@/models/Portfolio";

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
    if (!payload?.user) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    // 🔹 Connect to DB
    await DbConnect();

    // 🔹 Verify user exists
    const user = await User.findById(payload.user._id).select("_id");
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // 🔹 Fetch portfolios authored by the user
    const userPortfolios = await Portfolio.find({ author: user._id })
      .populate("containerId")       // Optional: populate container details
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: userPortfolios.length,
      data: userPortfolios,
    });
  } catch (error) {
    console.error("Error fetching user portfolios:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
