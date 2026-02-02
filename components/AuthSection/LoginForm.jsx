"use client";

import { useRouter } from "next/navigation";
import { AuthButton, FormInput } from "./AuthUtils/AuthFunctions";
import { useState } from "react";
import Link from "next/link";

export const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // default role
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.role) newErrors.role = "Please select a role";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.user.role === "admin") {
        window.location.href = "/profile";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative mx-auto my-16 w-full max-w-md">
      {/* Floating container with shadow-box effect */}
      <div className="p-6 rounded-md bg-neutral-300 shadow-box border border-neutral-400">
        <h2 className="text-2xl font-bold text-center text-neutral-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
          />

          {/* Password Input */}
          <FormInput
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={errors.password}
          />

          {/* Role Selector */}
          <div className="text-sm space-y-1">
            <label className="font-medium text-neutral-800">Login As</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className={`w-full border px-3 py-2 rounded text-sm bg-white ${
                errors.role ? "border-red-400" : "border-neutral-400"
              } focus:outline-none focus:ring-1 focus:ring-neutral-600`}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <span className="text-red-500 text-xs bg-red-100 px-2 py-1 rounded">
                {errors.role}
              </span>
            )}
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <AuthButton isLoading={isLoading}>Log In</AuthButton>

          {/* Sign Up Link */}
          <p className="text-sm text-center text-neutral-700 mt-3">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-800 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
