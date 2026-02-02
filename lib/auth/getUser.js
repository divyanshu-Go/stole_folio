// lib/auth/getUser.js
import { verifyToken } from "@/lib/auth/token";

export async function getUser(req) {
  try {
    // Extract the auth token from cookies
    const authCookie = req.cookies.get("auth_token");
    const token = authCookie?.value;
    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload || !payload.user) return null;

    const user = payload.user;

    return user || null;
  } catch (error) {
    console.error("getUser error:", error);
    return null;
  }
}

