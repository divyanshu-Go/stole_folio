'use client';

export default function Tooltip({ text, children }) {
  return (
    <div className="relative group flex items-center">
      {children}

      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2
                   opacity-0 group-hover:opacity-100 transition-all duration-200
                   bg-zinc-800 text-white text-xs font-medium
                   px-2 py-1 rounded-md  border border-zinc-700
                   z-50 whitespace-nowrap pointer-events-none"
      >
        {text}
      </div>
    </div>
  );
}
