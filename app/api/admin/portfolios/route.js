// app/api/portfolios/route.js
import { NextResponse } from "next/server";
import Container from "@/models/Container";
import Portfolio from "@/models/Portfolio";
import DbConnect from "@/lib/db/DbConnect";
import User from "@/models/user";
import { verifyToken } from "@/lib/auth/token";

export async function POST(request) {
  try {
    await DbConnect();

    const { containerData, portfolioData } = await request.json();

    const authCookie = request.cookies.get("auth_token");
    if (!authCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const token = authCookie.value;
    const payload = await verifyToken(token);

    if (!payload?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const user = await User.findById(payload.user._id).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!containerData || !portfolioData) {
      return NextResponse.json(
        { error: "Container data and portfolio data are required" },
        { status: 400 }
      );
    }

    const { title, url, description } = portfolioData;

    if (!title || !url) {
      return NextResponse.json(
        { error: "Title and URL are required" },
        { status: 400 }
      );
    }

    if (!/^[a-z0-9-]+$/.test(url)) {
      return NextResponse.json(
        { error: "URL can only contain lowercase letters, numbers, and hyphens" },
        { status: 400 }
      );
    }

    const existingPortfolio = await Portfolio.findOne({ url });
    if (existingPortfolio) {
      return NextResponse.json(
        { error: "URL already exists. Please choose a different URL." },
        { status: 409 }
      );
    }

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

    const newContainer = new Container({
      ...transformedContainer,
      projectName: `${title} - Portfolio`,
      author: user._id,
    });

    const savedContainer = await newContainer.save();

    const newPortfolio = new Portfolio({
      author: user._id,
      title: title.trim(),
      url: url.toLowerCase().trim(),
      containerId: savedContainer._id,
      description: description?.trim() || "",
      isPublic: true,
      isApproved: false, // always starts pending
    });

    const savedPortfolio = await newPortfolio.save();

    return NextResponse.json(
      {
        success: true,
        message: "Portfolio published successfully — pending admin approval",
        data: {
          portfolioId: savedPortfolio._id,
          url: savedPortfolio.url,
          containerId: savedContainer._id,
          redirectUrl: `/portfolio/${savedPortfolio.url}`,
        },
        savedPortfolio,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error publishing portfolio:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Validation error", details: error.message },
        { status: 400 }
      );
    }

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

// Public gallery — only approved portfolios
export async function GET() {
  try {
    await DbConnect();

    const portfolios = await Portfolio.find({ isPublic: true })
      .populate("containerId")
      .populate("author", "name email")
      .select("author title url description containerId createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { success: true, data: portfolios, count: portfolios.length },
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