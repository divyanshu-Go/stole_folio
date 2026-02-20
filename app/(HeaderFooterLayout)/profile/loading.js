// app/(HeaderFooterLayout)/profile/loading.js

export default function ProfileLoading() {
  return (
    <div className="mx-auto max-w-4xl w-full animate-pulse">
      <div className="bg-neutral-300 rounded-lg shadow-box border border-neutral-400 overflow-hidden">

        {/* Card Header */}
        <div className="p-6 border-b border-neutral-400 space-y-2">
          <div className="h-7 w-48 bg-neutral-400 rounded" />
          <div className="h-4 w-64 bg-neutral-400 rounded" />
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 py-4">

            {/* Avatar circle */}
            <div className="flex-shrink-0 w-32 h-32 rounded-full bg-neutral-400 shadow-box" />

            {/* Right side */}
            <div className="flex-grow space-y-4 w-full">

              {/* User details block */}
              <div className="bg-neutral-200 p-4 rounded-md border border-neutral-400 shadow-sm space-y-3">
                <div className="h-5 w-28 bg-neutral-400 rounded" />
                <div className="space-y-2 mt-2">
                  <div className="h-4 w-48 bg-neutral-300 rounded" />
                  <div className="h-4 w-64 bg-neutral-300 rounded" />
                </div>
              </div>

              {/* Role & joined */}
              <div className="flex items-center justify-between bg-neutral-200 p-4 rounded-md border border-neutral-400 shadow-sm">
                <div className="h-7 w-16 bg-neutral-400 rounded-md" />
                <div className="h-4 w-40 bg-neutral-300 rounded" />
              </div>

              {/* Action buttons row */}
              <div className="flex gap-3 flex-wrap mt-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-9 w-32 bg-neutral-400 rounded-md" />
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}