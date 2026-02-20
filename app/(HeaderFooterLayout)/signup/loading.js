// app/signup/loading.js
export default function SignupLoading() {
  return (
    <div className="mx-auto my-12 w-full max-w-md p-6 rounded-md shadow-box border border-neutral-400 bg-neutral-300 animate-pulse">
      {/* Title skeleton */}
      <div className="h-7 w-44 bg-neutral-400 rounded mx-auto mb-6" />

      <div className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <div className="h-4 w-10 bg-neutral-400 rounded" />
          <div className="h-9 bg-neutral-200 border border-neutral-400 rounded-md" />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <div className="h-4 w-12 bg-neutral-400 rounded" />
          <div className="h-9 bg-neutral-200 border border-neutral-400 rounded-md" />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="h-4 w-16 bg-neutral-400 rounded" />
          <div className="h-9 bg-neutral-200 border border-neutral-400 rounded-md" />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <div className="h-4 w-28 bg-neutral-400 rounded" />
          <div className="h-9 bg-neutral-200 border border-neutral-400 rounded-md" />
        </div>

        {/* Hint text skeleton */}
        <div className="h-3 w-48 bg-neutral-400 rounded" />

        {/* Button skeleton */}
        <div className="h-9 mt-3 bg-neutral-400 rounded-sm" />

        {/* Link skeleton */}
        <div className="h-4 w-44 bg-neutral-400 rounded mx-auto" />
      </div>
    </div>
  );
}