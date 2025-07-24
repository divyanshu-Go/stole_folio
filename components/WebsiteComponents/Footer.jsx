"use client";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-emerald-700 px-3 py-2 rounded-lg mr-3">
                <span className="text-white font-bold text-lg">LOGO</span>
              </div>
              <span className="text-xl font-semibold">Portfolio Builder</span>
            </div>
            <p className="text-emerald-200 text-sm leading-relaxed">
              Create stunning, professional portfolios in minutes. Join
              thousands of creators who trust our platform to showcase their
              work and land their dream opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-emerald-200 hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolios"
                  className="text-emerald-200 hover:text-white transition-colors text-sm"
                >
                  Portfolios
                </Link>
              </li>
              <li>
                <Link
                  href="/ui-builder"
                  className="text-emerald-200 hover:text-white transition-colors text-sm"
                >
                  UI-Builder
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-emerald-200 hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-emerald-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-2">
            {/* Social Icons */}
            <div className="flex space-x-10">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-200 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-200 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-200 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-emerald-200 text-sm text-center md:text-right">
              &copy; {currentYear} Portfolio Builder. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
