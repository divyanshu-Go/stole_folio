// app/api/user/profile/route.js
// Keep your existing GET handler and ADD this PATCH below it in the same file

import { verifyToken } from "@/lib/auth/token";
import DbConnect from "@/lib/db/DbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

// ── existing GET (unchanged) ─────────────────────────────────────────────────
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

    const user = await User.findById(payload.user._id).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ── new PATCH — update name ──────────────────────────────────────────────────
export async function PATCH(req) {
  try {
    const authCookie = req.cookies.get("auth_token");
    if (!authCookie) {
      return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
    }

    const payload = await verifyToken(authCookie.value);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    await DbConnect();

    const updated = await User.findByIdAndUpdate(
      payload.user._id,
      { name: name.trim() },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updated) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updated });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}