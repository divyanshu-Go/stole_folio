// app/(HeaderFooterLayout)/about/page.jsx
import { Users, Lightbulb, Heart, Sparkles, Code2, Palette } from "lucide-react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">

      {/* Hero */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-800 tracking-tight">
          About <span
            style={{
              background: "linear-gradient(90deg, #f59e0b, #f97316, #e11d48)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Stole Folio
          </span>
        </h1>
        <p className="text-neutral-600 text-lg max-w-xl mx-auto">
          A platform built to make beautiful portfolios effortless — for developers, designers, and everyone in between.
        </p>
      </div>

      {/* Intro card */}
      <div className="bg-neutral-300 rounded-xl shadow-box border border-neutral-400 overflow-hidden">
        {/* Gradient accent bar */}
        <div className="h-1.5 w-full" style={{
          background: "linear-gradient(90deg, #f59e0b, #f97316, #e11d48)"
        }} />
        <div className="p-8 flex items-start gap-5">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neutral-200 border border-neutral-400 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-neutral-700 text-base leading-relaxed">
            <span className="font-bold text-neutral-900">Stole Folio</span> is your
            all-in-one portfolio builder. Drag, customize, publish — no design skills
            needed. We built it because great work deserves a great stage, and setting
            one up shouldn't take days.
          </p>
        </div>
      </div>

      {/* What we offer — 3 pillars */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-orange-500" /> What We Offer
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              icon: <Code2 className="w-6 h-6 text-orange-500" />,
              title: "Visual Builder",
              desc: "Compose your portfolio with a live drag-and-drop UI — no code required.",
            },
            {
              icon: <Palette className="w-6 h-6 text-rose-500" />,
              title: "Themes & Templates",
              desc: "Start from a community template or a blank canvas and make it yours.",
            },
            {
              icon: <Sparkles className="w-6 h-6 text-amber-500" />,
              title: "One-click Publish",
              desc: "Get a shareable URL instantly. Your portfolio, live in seconds.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-neutral-300 rounded-lg shadow-box border border-neutral-400 p-5 space-y-2 hover:border-neutral-500 transition-colors"
            >
              <div className="w-9 h-9 rounded-md bg-neutral-200 border border-neutral-400 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-semibold text-neutral-900 text-sm">{item.title}</h3>
              <p className="text-neutral-600 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-orange-500" /> Meet the Team
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-xl">
          {[
            { name: "Divyanshu Sharma", role: "Developer", img: "/divyanshu.webp" },
            { name: "Shivam Singh",     role: "UI/UX Designer", img: "/shivam.png" },
          ].map((member) => (
            <div
              key={member.name}
              className="bg-neutral-300 rounded-xl shadow-box border border-neutral-400 overflow-hidden hover:border-neutral-500 transition-colors"
            >
              {/* Gradient bar per card */}
              <div className="h-1 w-full" style={{
                background: "linear-gradient(90deg, #f59e0b, #f97316, #e11d48)"
              }} />
              <div className="p-6 flex flex-col items-center text-center gap-3">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-neutral-400 shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-neutral-900 flex items-center justify-center gap-1.5">
                    {member.name}
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  </h3>
                  <p className="text-neutral-500 text-xs mt-0.5">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default About;