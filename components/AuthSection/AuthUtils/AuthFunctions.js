"use client";

import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";

// Auth Button
export const AuthButton = ({ children, isLoading }) => (
 <button
  className="mt-3 w-full py-2 rounded-sm button-box transition 
             disabled:opacity-60 disabled:cursor-not-allowed"
  disabled={isLoading}
>
  {isLoading ? (
    <div className="flex items-center justify-center text-sm py-1">
      Please wait
      <LoaderCircle className="animate-spin ml-2 h-4 w-4" />
    </div>
  ) : (
    children
  )}
</button>

);

// Input field with password toggle and validation
export const FormInput = ({ label, type, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="text-sm space-y-1">
      <div className="flex justify-between items-center">
        <label className="font-medium text-neutral-800">{label}</label>
        {error && (
          <span className="text-red-600 text-xs bg-red-100 px-2 py-0.5 rounded">
            {error}
          </span>
        )}
      </div>
      <div className="relative">
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          value={value}
          onChange={onChange}
          className={`w-full border px-3 py-2 rounded-md text-sm bg-neutral-100
            ${error ? "border-red-400" : "border-neutral-400"} 
            focus:outline-none focus:ring-1 focus:ring-neutral-800`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-900"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};
