"use client";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex justify-center p-1.5 ">
      <div className="bg-neutral-300 text-neutral-800 shadow-box rounded-sm w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="px-3 py-2 rounded-lg mr-3">
                <span className="flex items-center gap-3">
                  <img src="Logo.ico" alt="Logo" width={25} />
                  <p className="font-bold text-xl text-neutral-900">
                    Stole Folio
                  </p>
                </span>
              </div>
            </div>
            <p className="text-neutral-700 text-sm leading-relaxed">
              Create stunning, professional portfolios in minutes. Join
              thousands of creators who trust our platform to showcase their
              work and land their dream opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-900">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-neutral-700 hover:text-neutral-950 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolios"
                  className="text-neutral-700 hover:text-neutral-950 transition-colors text-sm"
                >
                  Portfolios
                </Link>
              </li>
              <li>
                <Link
                  href="/ui-builder"
                  className="text-neutral-700 hover:text-neutral-950 transition-colors text-sm"
                >
                  UI-Builder
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-neutral-700 hover:text-neutral-950 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-neutral-400">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-2">
            {/* Social Icons */}
            <div className="flex space-x-10">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 hover:text-neutral-950 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 hover:text-neutral-950 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 hover:text-neutral-950 transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-neutral-600 text-sm text-center md:text-right">
              &copy; {currentYear} Portfolio Builder. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
