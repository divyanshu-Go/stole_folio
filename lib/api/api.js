import { cookies } from "next/headers";
import { convertToPlainObject } from "../utils/container";
import Container from "@/lib/utils/ContainerClass";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://stole-folio.vercel.app";

export async function getUserProfile() {
  const cookieStore = await cookies(); // 🟢 This reads cookies on the server
  const token = cookieStore.get("auth_token")?.value ;

  if (!token) {
    return null;
  }

  const res = await fetch(`${BASE_URL}/api/user/profile`, {
    method: "GET",
    headers: {
      Cookie: `auth_token=${token}`, // 🟢 Pass the cookie to the backend API
    },
    cache: "no-store",
  });

  const json = await res.json();
  if (!res.ok || !json.user) {
    console.error("User fetch failed. API responded with: " + (json.message || "Unknown error"));
  }

  return json.user;
}





/**
 * Get all users (Admin only)
 */
export async function getAllUsers() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  const res = await fetch(`${BASE_URL}/api/user`, {
    method: "GET",
    headers: {
      Cookie: `auth_token=${token}`,
    },
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok || !json.users) {
    console.error(
      "Fetch all users failed. API responded with: " +
        (json.error || json.message || "Unknown error")
    );
    return null;
  }

  return json.users;
}

/**
 * Get a specific user by ID (Admin only)
 */
export async function getUserById(id) {
  if (!id) return null;

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  const res = await fetch(`${BASE_URL}/api/user/${id}`, {
    method: "GET",
    headers: {
      Cookie: `auth_token=${token}`,
    },
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok || !json.user) {
    console.error(
      `Fetch user ${id} failed. API responded with: ` +
        (json.error || json.message || "Unknown error")
    );
    return null;
  }

  return json.user;
}





export async function getPortfolios() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const res = await fetch(`${BASE_URL}/api/portfolios`, {
    method: "GET",
    headers: token ? { Cookie: `auth_token=${token}` } : {},
    cache: "no-store", // server-side fetch, no caching
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    console.error("Portfolio fetch failed", json.message || json);
    return null;
  }

  return json.data || [];
}




export async function getPortfolioById(url) {
  try {
    const response = await fetch(`${BASE_URL}/api/portfolios/${url}`, {
      cache: "no-store", // Always fetch fresh data
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    if (result.success && result.data.container) {
      // Convert MongoDB document → plain object → Container instance
      const plainObject = convertToPlainObject(result.data.container);
      const container = Container.fromJSON(plainObject);

      return {
        container,
        portfolio: result.data.portfolio,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }
}


export async function getUserPortfolios() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return [];
  }

  const res = await fetch(`${BASE_URL}/api/portfolios/user`, {
    method: "GET",
    headers: {
      Cookie: `auth_token=${token}`,
    },
    cache: "no-store", // always fresh data
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    console.error(
      "Fetching user portfolios failed: " + (json.error || "Unknown error")
    );
    return [];
  }

  // 🟢 Convert MongoDB objects to plain objects (safe for React/Next)
  return json.data;
}




export async function getUserContainers() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return [];
  }

  const res = await fetch(`${BASE_URL}/api/containers/user`, {
    method: "GET",
    headers: {
      Cookie: `auth_token=${token}`,
    },
    cache: "no-store", // always fresh data
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    console.error(
      "Fetching user containers failed: " + (json.error || "Unknown error")
    );
    return [];
  }

  // 🟢 Convert MongoDB objects to plain objects (safe for React/Next)
  
  return json.data;
}






export async function getContainerData(containerId) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      console.error("No auth token found, cannot fetch container.");
      return null;
    }

    const res = await fetch(`${BASE_URL}/api/containers/${containerId}`, {
      method: "GET",
      headers: {
        Cookie: `auth_token=${token}`, // forward cookie for auth
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch container:", res.status);
      return null;
    }

    const json = await res.json();

    if (!json?.success || !json?.data) {
      console.error("API did not return a valid container.");
      return null;
    }

    // Convert back into Container instance
    const plainObject = convertToPlainObject(json.data);
    return Container.fromJSON(plainObject);
  } catch (err) {
    console.error("Error fetching container:", err);
    return null;
  }
}
