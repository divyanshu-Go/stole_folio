"use client";

import { useState, useEffect, useRef } from "react";
import { X, User, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const EditProfileModal = ({ user, isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState(user?.name ?? "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // Sync name if user prop changes
  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setError("");
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const validate = () => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (name.trim() === user?.name) return "No changes made";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      toast.success("Profile updated successfully");
      onSuccess(); // triggers router.refresh() in parent
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal card */}
      <div className="w-full max-w-sm rounded-xl bg-neutral-300 border border-neutral-400 shadow-box overflow-hidden">

        {/* Gradient wave accent — matches login/signup */}
        <div className="relative h-1.5 w-full">
          <svg viewBox="0 0 400 10" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="modalWave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
            </defs>
            <rect width="400" height="10" fill="url(#modalWave)" />
          </svg>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-neutral-400">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Edit Profile</h3>
            <p className="text-xs text-neutral-500 mt-0.5">Update your display name</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-900 transition-colors p-1 rounded hover:bg-neutral-400"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          {/* Name input */}
          <div className="text-sm space-y-1">
            <div className="flex justify-between items-center min-h-[1.25rem]">
              <label className="font-medium text-neutral-700">Name</label>
              {error && (
                <span className="text-red-600 text-xs bg-red-100 px-2 py-0.5 rounded">
                  {error}
                </span>
              )}
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-neutral-400 pointer-events-none">
                <User size={15} />
              </span>
              <input
                ref={inputRef}
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                autoComplete="name"
                placeholder="Your full name"
                className={`w-full border py-2 pl-9 pr-3 rounded-md text-sm bg-neutral-100
                  ${error ? "border-red-400" : "border-neutral-400"}
                  focus:outline-none focus:ring-1 focus:ring-neutral-700
                  placeholder:text-neutral-400`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-sm text-sm font-medium border border-neutral-500
                         text-neutral-700 hover:bg-neutral-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2 rounded-sm button-box text-sm font-medium
                         disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  Saving <LoaderCircle className="animate-spin h-4 w-4" />
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;