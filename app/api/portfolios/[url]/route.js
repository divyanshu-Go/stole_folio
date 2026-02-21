// app/api/portfolio/[url]/route.js
import { NextResponse } from "next/server";
import Portfolio from "@/models/Portfolio";
import Container from "@/models/Container";
import DbConnect from "@/lib/db/DbConnect";
import { getUser } from "@/lib/auth/getUser";

export async function GET(request, { params }) {
  try {
    await DbConnect();

    const { url } = await params;

    if (!url) {
      return NextResponse.json(
        { error: "URL parameter is required" },
        { status: 400 }
      );
    }

    // Find portfolio by URL and populate the container
    const portfolio = await Portfolio.findOne({ 
      url: url.toLowerCase(),
      isPublic: true 
    }).populate('containerId');

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    if (!portfolio.containerId) {
      return NextResponse.json(
        { error: "Portfolio container not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        data: {
          portfolio: {
            _id: portfolio._id,
            author: portfolio.author || "Auth",
            title: portfolio.title,
            url: portfolio.url,
            description: portfolio.description,
            createdAt: portfolio.createdAt,
          },
          container: portfolio.containerId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching portfolio:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



export async function DELETE(request, { params }) {
  try {
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { url } = await params;
    await DbConnect();

    const deleted = await Portfolio.findOneAndDelete({ url: url.toLowerCase() });
    if (!deleted) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Portfolio deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(" delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

