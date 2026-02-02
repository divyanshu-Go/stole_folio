// app/api/containers/route.js
import { NextResponse } from "next/server";
import Container from "@/models/Container";
import DbConnect from "@/lib/db/DbConnect";
import { verifyToken } from "@/lib/auth/token";

export async function POST(request) {
  try {
    // Connect to database
    await DbConnect();

    // 🔹 Get auth token from cookies
    const authCookie = request.cookies.get("auth_token");
    if (!authCookie) {
      return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }

    const token = authCookie.value;
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Parse the request body
    const { containerData, projectName } = await request.json();

    // Validate required fields
    if (!containerData) {
      return NextResponse.json(
        { error: "Container data is required" },
        { status: 400 }
      );
    }

    // Transform the container data to match MongoDB schema
    const transformContainer = (container) => {
      if (!container) return null;

      return {
        name: container.name || "Container",
        container_Id: container.container_Id,
        sectionId: container.sectionId,
        type: container.type || "div",
        text: container.text || "Sample Text",
        projectName: container.projectName || "Untitled Project",
        author: container.author || payload.user._id,
        styles: container.styles || {},
        hoverStyles: container.hoverStyles || {},
        children: container.children
          ? container.children.map((child) => transformContainer(child))
          : [],
        locked: container.locked || false,
        hidden: container.hidden || false,
        // Link properties
        linkUrl: container.linkUrl || "",
        linkTarget: container.linkTarget || "_self",
        linkTitle: container.linkTitle || "",
        isClickable: container.isClickable || false,
        // image properties
        imageUrl: container.imageUrl || "",
        imageAlt: container.imageAlt || "",
        imageMode: container.imageMode || "none",
        imagePosition: container.imagePosition || "center",
        imageSize: container.imageSize || "cover",
        imageRepeat: container.imageRepeat || "no-repeat",

        // icon properties
        iconName: container.iconName || "",
        iconSize: container.iconSize || "16",
        iconColor: container.iconColor || "transparent",
        hasIcon: container.hasIcon || false,
      };
    };

    // Transform the root container
    const transformedContainer = transformContainer(containerData);

    // Create a new container document
    const newContainer = new Container({
      ...transformedContainer,
      projectName: projectName || "Untitled Project",
      author: payload.user._id,
    });

    // Save to database
    const savedContainer = await newContainer.save();

    return NextResponse.json(
      {
        success: true,
        message: "Container saved successfully",
        data: {
          id: savedContainer._id,
          container_Id: savedContainer.container_Id,
          projectName: savedContainer.projectName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving container:", error);

    // Handle specific MongoDB errors
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          error: "Validation error",
          details: error.message,
        },
        { status: 400 }
      );
    }

    if (error.name === "MongoError" && error.code === 11000) {
      return NextResponse.json(
        { error: "Container with this ID already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



export async function GET(request) {
  try {
    // Connect to database
    await DbConnect();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const containerId = searchParams.get("id");
    const projectName = searchParams.get("projectName");
    const authorId = searchParams.get("authorId");

    let query = {};

    if (containerId) {
      query._id = containerId;
    }

    if (projectName) {
      query.projectName = projectName;
    }

    if (authorId) {
      query.author = authorId;
    }

    // Find containers
    const containers = await Container.find(query)
      .sort({ createdAt: -1 })
      .limit(50); // Limit results to prevent large responses

    return NextResponse.json({
      success: true,
      data: containers,
      count: containers.length,
    });
  } catch (error) {
    console.error("Error fetching containers:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
