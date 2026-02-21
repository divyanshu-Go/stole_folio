// app/api/admin/portfolios/[id]/route.js
import { NextResponse } from "next/server";
import Portfolio from "@/models/Portfolio";
import DbConnect from "@/lib/db/DbConnect";
import { verifyToken } from "@/lib/auth/token";

async function requireAdmin(request) {
  const authCookie = request.cookies.get("auth_token");
  if (!authCookie) return null;
  const payload = await verifyToken(authCookie.value);
  if (!payload?.user || payload.user.role !== "admin") return null;
  return payload.user;
}

// PATCH /api/admin/portfolios/[id]
// Body: { isApproved: true | false }
export async function PATCH(request, { params }) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const { isApproved } = await request.json();

    if (typeof isApproved !== "boolean") {
      return NextResponse.json(
        { error: "isApproved must be a boolean" },
        { status: 400 }
      );
    }

    await DbConnect();

    const updated = await Portfolio.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    ).select("title url isApproved");

    if (!updated) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: `Portfolio ${isApproved ? "approved" : "rejected"}`,
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin approval error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/portfolios/[id]
export async function DELETE(request, { params }) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    await DbConnect();

    const deleted = await Portfolio.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Portfolio deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}