// components/AuthSection/SignupForm.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { AuthButton, FormInput } from "./AuthUtils/AuthFunctions";

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Min 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Signup failed");

      window.location.href = "/";
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto my-12 w-full max-w-md p-6 rounded-md shadow-box border border-neutral-400 bg-neutral-300">
      <h2 className="text-2xl font-bold text-center text-neutral-900 mb-6">
        Create an Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          autoComplete="name"
          placeholder="Your full name"
        />
        <FormInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          autoComplete="email"
          placeholder="you@example.com"
        />
        <FormInput
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={errors.password}
          autoComplete="new-password"
        />
        <FormInput
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <p className="text-xs text-neutral-500">
          Password must be at least 8 characters.
        </p>

        <AuthButton isLoading={isLoading}>Sign Up</AuthButton>

        <p className="text-sm text-center text-neutral-700 mt-3">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-800 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};