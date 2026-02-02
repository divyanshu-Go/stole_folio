"use client";

import React from "react";
import { User, LogOut, Edit, Pencil, Folders } from "lucide-react";
import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

const ProfileDashboard = ({ user }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) {
    return (
      <div className="grid place-items-center py-10">
        <p className="text-lg font-semibold rounded text-red-600 bg-red-200 p-4 shadow-box">
          Login Required
        </p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-300 rounded-lg shadow-box border border-neutral-400 overflow-hidden">
      {/* Card Header */}
      <div className="p-6 border-b border-neutral-400">
        <h2 className="text-2xl font-semibold text-neutral-900">
          Profile Dashboard
        </h2>
        <p className="text-sm text-neutral-700">
          Manage your profile and settings
        </p>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 py-4">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-neutral-200 flex items-center justify-center shadow-box">
              <User className="w-16 h-16 text-neutral-700" />
            </div>
          </div>

          {/* User Information */}
          <div className="flex-grow space-y-4 w-full">
            {/* User Details */}
            <div className="bg-neutral-200 p-4 rounded-md w-full flex flex-col gap-3 border border-neutral-400 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-900 max-w-max">
                User Details
              </h3>
              <div className="text-md text-neutral-700 mt-2 space-y-2">
                <p>
                  <span className="font-medium text-neutral-800">Name :</span>
                  <span className="font-semibold"> {user?.name}</span>
                </p>
                <p>
                  <span className="font-medium text-neutral-800">Email :</span>
                  <span className="font-semibold"> {user?.email}</span>
                </p>
              </div>
            </div>

            {/* Role & Joined Date */}
            <div className="flex items-center justify-between bg-neutral-200 p-4 rounded-md
             border border-neutral-400 shadow-sm">
              <span className="text-sm bg-neutral-800 
               text-neutral-100 px-3 py-1 rounded-md hover-box ">
                {user?.role}
              </span>
              <span className="text-sm text-neutral-700">
                Joined on {format(new Date(user?.createdAt), "MMMM dd, yyyy")}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6 flex-wrap">
              {/* Edit Profile */}
              <button
                className="flex items-center border border-neutral-600 text-neutral-800 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-sm"
                onClick={() => router.push("/profile/edit")}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>

              {/* Logout */}
              <button
                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>

              {/* Create Task */}
              <button
                className="flex items-center bg-neutral-700 hover:bg-neutral-900 text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-sm"
                onClick={() => router.push("/ui-builder/blank")}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Create UI
              </button>

              {/* Dashboard Switch */}
              {user.role === "admin" ? (
                <button
                  className="flex items-center border border-neutral-600 text-neutral-800 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-sm"
                  onClick={() => router.push("/admin-dashboard")}
                >
                  <Folders className="w-4 h-4 mr-2" />
                  Admin Dashboard
                </button>
              ) : (
                <button
                  className="flex items-center border border-neutral-600 text-neutral-800 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-sm"
                  onClick={() => router.push("/user-dashboard")}
                >
                  <Folders className="w-4 h-4 mr-2" />
                  User Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
