// app/login/loading.js
import { LoaderCircle } from "lucide-react";

export default function LoginLoading() {
  return (
    <div className="relative mx-auto my-16 w-full max-w-md">
      <div className="p-6 rounded-md bg-neutral-300 shadow-box border border-neutral-400 animate-pulse">
        {/* Title skeleton */}
        <div className="h-7 w-36 bg-neutral-400 rounded mx-auto mb-6" />

        <div className="space-y-4">
          {/* Email field skeleton */}
          <div className="space-y-1">
            <div className="h-4 w-12 bg-neutral-400 rounded" />
            <div className="h-9 bg-neutral-200 border border-neutral-400 rounded-md" />
          </div>

          {/* Password field skeleton */}
          <div className="space-y-1">
            <div className="h-4 w-16 bg-neutral-400 rounded" />
            <div className="h-9 bg-neutral-200 border border-neutral-400 rounded-md" />
          </div>

          {/* Role toggle skeleton */}
          <div className="space-y-1.5">
            <div className="h-4 w-14 bg-neutral-400 rounded" />
            <div className="h-9 bg-neutral-200 border border-neutral-400 rounded-md" />
          </div>

          {/* Button skeleton */}
          <div className="h-9 mt-3 bg-neutral-400 rounded-sm" />

          {/* Link skeleton */}
          <div className="h-4 w-48 bg-neutral-400 rounded mx-auto" />
        </div>
      </div>
    </div>
  );
}