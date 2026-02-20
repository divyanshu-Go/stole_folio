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
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    const query = new URLSearchParams(formData).toString();
    router.push(`/ui-builder?${query}`);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-neutral-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-neutral-300 shadow-box rounded-2xl p-8">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
              Let’s Build Your Portfolio
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
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border text-sm rounded-md bg-white focus:ring-2 focus:ring-neutral-700 focus:border-neutral-700 ${
                      errors.name ? "border-red-500" : "border-neutral-400"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Profession *
                  </label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border text-sm rounded-md bg-white focus:ring-2 focus:ring-neutral-700 focus:border-neutral-700 ${
                      errors.profession
                        ? "border-red-500"
                        : "border-neutral-400"
                    }`}
                  />
                  {errors.profession && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.profession}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Bio *
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-3 py-2 border text-sm rounded-md bg-white focus:ring-2 focus:ring-neutral-700 focus:border-neutral-700 ${
                    errors.bio ? "border-red-500" : "border-neutral-400"
                  }`}
                />
                {errors.bio && (
                  <p className="text-red-500 text-xs mt-1">{errors.bio}</p>
                )}
                <p className="text-neutral-500 text-xs mt-1">
                  {formData.bio.length}/500 characters
                </p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-neutral-700" /> Contact
                Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border text-sm rounded-md bg-white focus:ring-2 focus:ring-neutral-700 focus:border-neutral-700 ${
                      errors.email ? "border-red-500" : "border-neutral-400"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border text-sm rounded-md bg-white border-neutral-400 focus:ring-2 focus:ring-neutral-700 focus:border-neutral-700"
                  />
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-neutral-700" /> Social
                Media
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    GitHub
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border text-sm rounded-md bg-white border-neutral-400 focus:ring-2 focus:ring-neutral-700 focus:border-neutral-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border text-sm rounded-md bg-white border-neutral-400 focus:ring-2 focus:ring-neutral-700 focus:border-neutral-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Instagram
                  </label>
                  <input
                    type="url"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border text-sm rounded-md bg-white border-neutral-400 focus:ring-2 focus:ring-neutral-700 focus:border-neutral-700"
                  />
                </div>
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
                {isSubmitting
                  ? "Creating Your Portfolio..."
                  : "Generate Portfolio"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PortfolioForm;
