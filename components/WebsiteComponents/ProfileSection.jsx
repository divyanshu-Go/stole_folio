"use client";

import Link from "next/link";
import { User2, LogOut, LogIn, UserPlus } from "lucide-react";
import Tooltip from "./Tooltip";
import axios from "axios";

export default function ProfileSection({ user }) {
  // Logout logic
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className=" flex items-center gap-4 justify-between">
      {user ? (
        <>
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 h-8 rounded-md text-sm font-bold
                       bg-red-500 hover:bg-red-600 text-white
                       nav-btn-box transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>

          {/* Profile button */}
          <Tooltip text="Profile">
            <Link
              href="/profile"
              className="flex items-center justify-center w-8 h-8 rounded-md 
                         bg-neutral-700 hover:bg-neutral-800 text-white
                         nav-btn-box transition-all duration-200"
            >
              <User2 className="h-4 w-4" />
            </Link>
          </Tooltip>
        </>
      ) : (
        <>
          {/* Login button */}
          <Link
            href="/login"
            className="flex items-center gap-2 px-3 h-8 rounded-md text-sm font-bold
                      border border-emerald-800 hover:border-neutral-900
                      text-emerald-800 hover:text-neutral-900
                       color-btn-box"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Link>

          {/* Signup button */}
          <Link
            href="/signup"
            className="flex items-center gap-2 px-3 h-8 rounded-md text-sm font-bold
                       border border-blue-800 hover:border-neutral-900
                      text-blue-800 hover:text-neutral-900
                       color-btn-box "
          >
            <UserPlus className="w-4 h-4" />
            Signup
          </Link>
        </>
      )}
    </div>
  );
}
