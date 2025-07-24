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

  // Validate form data
  const newErrors = validateForm();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setIsSubmitting(true);

  // Optional: Show alert and delay for demo effect
  setTimeout(() => {
    console.log("Form Data:", formData);
    setIsSubmitting(false);

    // ✅ Build query string from formData
    const query = new URLSearchParams(formData).toString();

    // ✅ Redirect to /ui-builder with query
    router.push(`/ui-builder?${query}`);
  }, 1500);
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-sm">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900 mb-3">
            Let's Build Your Portfolio
          </h1>
          <p className="text-sm text-emerald-700">
            Fill in your details below to create a stunning portfolio that
            showcases your unique skills and personality.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 space-y-6"
        >
          {/* Personal Info */}
          <div>
            <h2 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center">
              <User className="w-4 h-4 mr-2 text-emerald-600" /> Personal
              Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-emerald-800 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border text-sm rounded-md focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-emerald-800 mb-1">
                  Profession *
                </label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border text-sm rounded-md focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.profession ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.profession && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.profession}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-emerald-800 mb-1">
                Bio *
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="3"
                className={`w-full px-3 py-2 border text-sm rounded-md focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.bio ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.bio && (
                <p className="text-red-500 text-xs mt-1">{errors.bio}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                {formData.bio.length}/500 characters
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-emerald-600" /> Contact
              Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-emerald-800 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border text-sm rounded-md focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-emerald-800 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border text-sm rounded-md focus:ring-emerald-500 focus:border-emerald-500 border-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-emerald-600" /> Social
              Media
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-emerald-800 mb-1">
                  GitHub
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border text-sm rounded-md focus:ring-emerald-500 focus:border-emerald-500 border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-emerald-800 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border text-sm rounded-md focus:ring-emerald-500 focus:border-emerald-500 border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-emerald-800 mb-1">
                  Instagram
                </label>
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border text-sm rounded-md focus:ring-emerald-500 focus:border-emerald-500 border-gray-300"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 px-4 rounded-md shadow-md hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Creating Your Portfolio..."
                : "Generate Portfolio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioForm;
