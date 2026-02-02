"use client";
import { Zap, Smartphone, Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-neutral-300 relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 shadow-box rounded-lg min-h-[85vh]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-neutral-400 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-14 h-14 bg-neutral-500 rounded-full opacity-15 animate-float-delay"></div>
      <div className="absolute bottom-32 left-20 w-16 h-16 bg-neutral-400 rounded-full opacity-20 animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-neutral-500 rounded-full opacity-15 animate-float"></div>

      {/* Animated Background Shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-neutral-400 rounded-full opacity-5 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-neutral-500 rounded-full opacity-5 animate-pulse-slow animate-delay-1000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Content Container - Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[60vh]">
          {/* Left Content - Text */}
          <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            {/* Main Heading */}
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-neutral-900 mb-4 leading-tight animate-fade-in-up">
                Build Your Perfect{" "}
                <span className="relative inline-block">
                  <span
                    className="gradient-text font-extrabold extrabold bg-clip-text text-transparent bg-size-200 animate-gradient-colorful"
                  >
                    Portfolio
                  </span>
                </span>{" "}
                in Minutes
              </h1>
            </div>

            {/* Subheader */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-800 mb-6 leading-relaxed animate-fade-in-up animate-delay-200">
              Create stunning, professional portfolios that showcase your work
              and skills. No coding required – just select, customize, and
              deploy your portfolio.
            </p>

            {/* Additional Description */}
            <p className="text-sm sm:text-base text-neutral-700 mb-8 animate-fade-in-up animate-delay-400">
              Join thousands of creators, developers, and professionals who
              trust our platform to build portfolios that land jobs and impress
              clients.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start mt-4 mb-8 animate-fade-in-up animate-delay-600">
              <Link
                href="/portfolio-form"
                className="button-box relative inline-flex px-8 py-4 items-center justify-center 
               text-lg font-semibold text-neutral-100 bg-neutral-800 
               rounded-full transition duration-200"
              >
                <span className="flex items-center ">
                  Build Your Portfolio
                  <svg
                    className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Feature Highlights - Horizontal on Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 animate-fade-in-up animate-delay-800">
              <div className="flex flex-col items-center lg:items-start text-neutral-800 group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg flex items-center justify-center mb-3 shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Zap className="w-6 h-6 text-neutral-700 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-semibold mb-1 text-sm transition-colors duration-300 group-hover:text-neutral-900">
                  Lightning Fast
                </h3>
                <p className="text-xs text-neutral-600 text-center lg:text-left transition-colors duration-300 group-hover:text-neutral-700">
                  Build in minutes
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-start text-neutral-800 group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg flex items-center justify-center mb-3 shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Smartphone className="w-6 h-6 text-neutral-700 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-semibold mb-1 text-sm transition-colors duration-300 group-hover:text-neutral-900">
                  Responsive
                </h3>
                <p className="text-xs text-neutral-600 text-center lg:text-left transition-colors duration-300 group-hover:text-neutral-700">
                  Any device
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-start text-neutral-800 group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg flex items-center justify-center mb-3 shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Code className="w-6 h-6 text-neutral-700 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-semibold mb-1 text-sm transition-colors duration-300 group-hover:text-neutral-900">
                  No Coding
                </h3>
                <p className="text-xs text-neutral-600 text-center lg:text-left transition-colors duration-300 group-hover:text-neutral-700">
                  Select & Customize
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className=" flex justify-center lg:justify-end items-center order-1 lg:order-2">
            <div className="relative animate-fade-in-up animate-delay-400">
              {/* Main Image - No Background */}
              <div className="relative transform transition-all duration-800 hover:scale-[101%]">
                <Image
                  src="/hero_image.png"
                  alt="Abstract illustration of website portfolio elements"
                  width={500}
                  height={400}
                  className="w-full h-auto max-w-[400px] sm:max-w-[500px] lg:max-w-[450px] xl:max-w-[500px] object-contain animate-float-gentle"
                  priority
                />

                {/* Decorative Elements around Image */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-bounce-gentle"></div>
                <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full animate-bounce-gentle animate-delay-1000"></div>
                <div className="absolute top-1/2 -right-2 w-4 h-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-bounce-gentle animate-delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
