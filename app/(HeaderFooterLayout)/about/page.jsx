"use client";

import { Users, Lightbulb, Heart } from "lucide-react";



const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">


      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-stone-700 mb-8">
        About Us
      </h1>

      {/* Intro Section */}
      <div className="bg-neutral-300 p-8 rounded-md shadow-box mb-12 flex items-start gap-6">
        <Lightbulb className="w-10 h-10 text-stone-700 mt-1" />
        <p className="text-black text-lg leading-relaxed">
          Welcome to <span className="font-bold text-stone-600">Stole Folio</span> – your
          ultimate solution to creating stunning, modern portfolios effortlessly. 
          Our platform empowers users to build, customize, and showcase their work
          with a simple and intuitive interface.
        </p>
      </div>

      {/* Team Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-extrabold text-stone-700 mb-6 flex items-center gap-3">
          <Users className="w-8 h-8" /> Meet the Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Example Team Member */}
          <div className="bg-neutral-300 p-6 rounded-md hover-box transition-all text-center">
            <img
              src="/team-member1.jpg"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-bold text-stone-700 flex items-center justify-center gap-2">
              Divyanshu Sharma <Heart className="w-5 h-5 text-red-500" />
            </h3>
            <p className="text-black text-sm">Developer</p>
          </div>

          {/* Example Team Member */}
          <div className="bg-neutral-300 p-6 rounded-md hover-box transition-all text-center">
            <img
              src="/team-member2.jpg"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-bold text-stone-700 flex items-center justify-center gap-2">
              Shivam Singh <Heart className="w-5 h-5 text-red-500" />
            </h3>
            <p className="text-black text-sm">UI/UX Designer</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
