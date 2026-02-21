// app/api/containers/[container_id]/route.js
import { NextResponse } from "next/server";
import DbConnect from "@/lib/db/DbConnect";
import { ObjectId } from "mongodb";
import Container from "@/models/Container";
import { verifyToken } from "@/lib/auth/token";
import User from "@/models/user";

// ✅ GET single container
export async function GET(request, { params }) {
  try {
    const { container_id } = await params;

    if (!container_id || !ObjectId.isValid(container_id)) {
      return NextResponse.json(
        { success: false, error: "Invalid container ID" },
        { status: 400 }
      );
    }


    await DbConnect();

    const SavedContainer = await Container.findOne({
      _id: container_id,
    });

    if (!SavedContainer) {
      return NextResponse.json(
        { success: false, error: "Container not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: SavedContainer,
    });
  } catch (error) {
    console.error("Error fetching container:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ✅ PUT update container
export async function PUT(request, { params }) {
  try {
    const { container_id } = await params;

    if (!container_id || !ObjectId.isValid(container_id)) {
      return NextResponse.json(
        { success: false, error: "Invalid container ID" },
        { status: 400 }
      );
    }

    // Auth check
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

    // Parse request body
    const body = await request.json();

    // Prevent overriding sensitive fields
    delete body._id;
    delete body.author;

    const updatedContainer = await Container.findOneAndUpdate(
      { _id: container_id, author: payload.user._id }, // ensure ownership
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedContainer) {
      return NextResponse.json(
        { success: false, error: "Container not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedContainer,
    });
  } catch (error) {
    console.error("Error updating container:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}




// ✅ DELETE a container
export async function DELETE(request, { params }) {
  try {
    const { container_id } = await params;

    if (!container_id || !ObjectId.isValid(container_id)) {
      return NextResponse.json(
        { success: false, error: "Invalid container ID" },
        { status: 400 }
      );
    }

    // Auth check
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

    // 🔹 Delete only if owned by the logged-in user
    const deleted = await Container.findOneAndDelete({
      _id: container_id,
      author: payload.user._id,
    });

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Container not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Container deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting container:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
