import { cookies } from "next/headers";

const TOKEN_NAME = 'auth_token';


export function setAuthCookie(token) {
  // Create cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 86400, // 24 hours
    path: '/'
  };

  // Return the cookie settings to be used with NextResponse
  return { name: TOKEN_NAME, value: token, ...cookieOptions };
}

export function removeAuthCookie() {
  // Return expired cookie settings
  return {
    name: TOKEN_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/'
  };
}

// Get cookie helper (for middleware)
export function getAuthCookie() {
  return cookies().get(TOKEN_NAME);
}