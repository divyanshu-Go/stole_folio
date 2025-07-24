'use client';
import { Zap, Smartphone, Code } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className=" bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100
     flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
          Build Your Perfect{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
            Portfolio
          </span>{' '}
          in Minutes
        </h1>

        {/* Subheader */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-emerald-700 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
          Create stunning, professional portfolios that showcase your work and skills. 
          No coding required - just select, customize, and deploy your portfolio.
        </p>

        {/* Additional Description */}
        <p className="text-sm sm:text-base md:text-lg text-emerald-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
          Join thousands of creators, developers, and professionals who trust our platform 
          to build portfolios that land jobs and impress clients.
        </p>

        {/* CTA Button */}
         <div className="flex justify-center my-10 w-fit ">
          <a 
            href="/portfolio-form" 
            className=" group relative inline-flex px-8 py-4 items-center justify-center text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600
             rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Button Content */}
            <span className="relative flex items-center">
              Build Your Portfolio
              <svg 
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
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

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700 ease-out"></div>
          </a>
        </div>

        {/* Feature Highlights */}
        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto px-2">
          
          <div className="flex flex-col items-center text-emerald-700">
            <div className="w-12 h-12 bg-emerald-100 rounded-sm flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Lightning Fast</h3>
            <p className="text-xs sm:text-sm text-emerald-600 text-center">Build in minutes, not hours</p>
          </div>

          <div className="flex flex-col items-center text-emerald-700">
            <div className="w-12 h-12 bg-emerald-100 rounded-sm flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Responsive Design</h3>
            <p className="text-xs sm:text-sm text-emerald-600 text-center">Perfect on any device</p>
          </div>

          <div className="flex flex-col items-center text-emerald-700 sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 bg-emerald-100 rounded-sm flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base">No Coding</h3>
            <p className="text-xs sm:text-sm text-emerald-600 text-center">Simple drag & drop interface</p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;