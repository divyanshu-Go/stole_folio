"use client";

import { useState } from "react";
import {
  User,
  Briefcase,
  Mail,
  Phone,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useRouter } from "next/navigation";

const BIO_MAX = 500;

// Validates that a string is either empty or a valid http/https URL
const isValidUrl = (val) => {
  if (!val.trim()) return true;
  try {
    const url = new URL(val);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const PortfolioForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    bio: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    instagram: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Enforce bio cap at the input level too
    if (name === "bio" && value.length > BIO_MAX) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.profession.trim())
      newErrors.profession = "Profession is required";
    if (!formData.bio.trim()) newErrors.bio = "Bio is required";
    else if (formData.bio.length < 10)
      newErrors.bio = "Bio must be at least 10 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";

    // URL validation for social fields
    if (!isValidUrl(formData.github))
      newErrors.github = "Enter a valid URL (https://...)";
    if (!isValidUrl(formData.linkedin))
      newErrors.linkedin = "Enter a valid URL (https://...)";
    if (!isValidUrl(formData.instagram))
      newErrors.instagram = "Enter a valid URL (https://...)";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Keep spinner on — navigation will unmount the component
    setIsSubmitting(true);
    const query = new URLSearchParams(formData).toString();
    router.push(`/ui-builder?${query}`);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-neutral-300 shadow-box rounded-2xl p-8">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
              Let's Build Your Portfolio
            </h1>
            <p className="text-sm text-neutral-700">
              Fill in your details to generate a professional portfolio.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info */}
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                <User className="w-4 h-4 mr-2 text-neutral-700" /> Personal
                Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Full Name *" error={errors.name}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Divyanshu sharma"
                    className={inputCls(errors.name)}
                  />
                </Field>

                <Field label="Profession *" error={errors.profession}>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    placeholder="Full-Stack Developer"
                    className={inputCls(errors.profession)}
                  />
                </Field>
              </div>

              <div className="mt-6">
                <Field label="Bio *" error={errors.bio}>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="3"
                    maxLength={BIO_MAX}
                    placeholder="A brief description of who you are and what you do..."
                    className={inputCls(errors.bio)}
                  />
                  <p
                    className={`text-xs mt-1 ${
                      formData.bio.length >= BIO_MAX
                        ? "text-red-500"
                        : "text-neutral-500"
                    }`}
                  >
                    {formData.bio.length}/{BIO_MAX} characters
                  </p>
                </Field>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-neutral-700" /> Contact
                Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Email *" error={errors.email}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className={inputCls(errors.email)}
                  />
                </Field>

                <Field label="Phone" error={errors.phone}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className={inputCls()}
                  />
                </Field>
              </div>
            </div>

            {/* Social */}
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-neutral-700" /> Social
                Media
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="GitHub" error={errors.github}>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username"
                    className={inputCls(errors.github)}
                  />
                </Field>

                <Field label="LinkedIn" error={errors.linkedin}>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                    className={inputCls(errors.linkedin)}
                  />
                </Field>

                <Field label="Instagram" error={errors.instagram}>
                  <input
                    type="url"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="https://instagram.com/username"
                    className={inputCls(errors.instagram)}
                  />
                </Field>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neutral-800 text-white font-bold py-3 px-4 rounded-md button-box
                           transition-all duration-200 ease-in-out
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Your Portfolio..." : "Generate Portfolio"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PortfolioForm;

// ── helpers ──────────────────────────────────────────────────────────────────

function inputCls(error) {
  return `w-full px-3 py-2 border text-sm rounded-md bg-white
    focus:ring-2 focus:ring-neutral-700 focus:border-neutral-700
    ${error ? "border-red-500" : "border-neutral-400"}`;
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-neutral-700 mb-1">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}