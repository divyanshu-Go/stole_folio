// app/api/portfolios/route.js
import { NextResponse } from "next/server";
import Container from "@/models/Container";
import Portfolio from "@/models/Portfolio";
import DbConnect from "@/lib/db/DbConnect";

export async function POST(request) {
  try {
    await DbConnect();

    const { containerData, portfolioData } = await request.json();

    // Validate required fields
    if (!containerData || !portfolioData) {
      return NextResponse.json(
        { error: "Container data and portfolio data are required" },
        { status: 400 }
      );
    }

    const { author, title, url, description } = portfolioData;

    // Validate portfolio data
    if (!author || !title || !url) {
      return NextResponse.json(
        { error: "Author, title, and URL are required" },
        { status: 400 }
      );
    }

    // Validate URL format (lowercase letters, numbers, hyphens only)
    if (!/^[a-z0-9-]+$/.test(url)) {
      return NextResponse.json(
        { error: "URL can only contain lowercase letters, numbers, and hyphens" },
        { status: 400 }
      );
    }

    // Check if URL already exists
    const existingPortfolio = await Portfolio.findOne({ url });
    if (existingPortfolio) {
      return NextResponse.json(
        { error: "URL already exists. Please choose a different URL." },
        { status: 409 }
      );
    }

    // Transform and save container (reusing existing logic)
    const transformContainer = (container) => {
      if (!container) return null;

      return {
        name: container.name || "Container",
        container_Id: container.container_Id,
        sectionId: container.sectionId,
        type: container.type || "div",
        text: container.text || "",
        styles: container.styles || {},
        hoverStyles: container.hoverStyles || {},
        children: container.children
          ? container.children.map((child) => transformContainer(child))
          : [],
        locked: container.locked || false,
        hidden: container.hidden || false,
        linkUrl: container.linkUrl || "",
        linkTarget: container.linkTarget || "_self",
        linkTitle: container.linkTitle || "",
        isClickable: container.isClickable || false,
        imageUrl: container.imageUrl || "",
        imageAlt: container.imageAlt || "",
        imageMode: container.imageMode || "none",
        imagePosition: container.imagePosition || "center",
        imageSize: container.imageSize || "cover",
        imageRepeat: container.imageRepeat || "no-repeat",
        iconName: container.iconName || "",
        iconSize: container.iconSize || "16",
        iconColor: container.iconColor || "transparent",
        hasIcon: container.hasIcon || false,
      };
    };

    const transformedContainer = transformContainer(containerData);

    // Save container first
    const newContainer = new Container({
      ...transformedContainer,
      projectName: `${title} - Portfolio`,
    });

    const savedContainer = await newContainer.save();

    // Create portfolio record
    const newPortfolio = new Portfolio({
      author: author.trim(),
      title: title.trim(),
      url: url.toLowerCase().trim(),
      containerId: savedContainer._id,
      description: description?.trim() || "",
      isPublic: true,
    });

    const savedPortfolio = await newPortfolio.save();

    return NextResponse.json(
      {
        success: true,
        message: "Portfolio published successfully",
        data: {
          portfolioId: savedPortfolio._id,
          url: savedPortfolio.url,
          containerId: savedContainer._id,
          redirectUrl: `/portfolio/${savedPortfolio.url}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error publishing portfolio:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          error: "Validation error",
          details: error.message,
        },
        { status: 400 }
      );
    }

    // Handle duplicate URL error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "URL already exists. Please choose a different URL." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}






export async function GET() {
  try {
    await DbConnect();

    // Fetch all public portfolios, sorted by newest first
    const portfolios = await Portfolio.find({ 
      isPublic: true 
    })
    .select('author title url description containerId createdAt') // Only select needed fields
    .sort({ createdAt: -1 }) // Newest first
    .lean(); // Return plain objects for better performance

    return NextResponse.json(
      {
        success: true,
        data: portfolios,
        count: portfolios.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching portfolios:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}