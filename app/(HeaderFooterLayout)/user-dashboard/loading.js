// app/(HeaderFooterLayout)/user-dashboard/loading.js
// Mirrors a typical dashboard layout: stat cards on top, then two data tables/grids

export default function UserDashboardLoading() {
  return (
    <div className="min-h-screen p-6 animate-pulse">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Page title */}
        <div className="space-y-2">
          <div className="h-8 w-48 bg-neutral-300 rounded" />
          <div className="h-4 w-72 bg-neutral-300 rounded" />
        </div>

        {/* Stat cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-neutral-200 rounded-sm shadow-box border border-neutral-300 p-4 space-y-2"
            >
              <div className="h-3 w-28 bg-neutral-300 rounded" />
              <div className="h-8 w-16 bg-neutral-400 rounded" />
            </div>
          ))}
        </div>

        {/* Containers section */}
        <div className="bg-neutral-200 rounded-sm shadow-box border border-neutral-300 overflow-hidden">
          {/* Section header */}
          <div className="px-5 py-4 border-b border-neutral-300 flex items-center justify-between">
            <div className="h-5 w-36 bg-neutral-400 rounded" />
            <div className="h-7 w-24 bg-neutral-300 rounded-sm" />
          </div>
          {/* Row items */}
          <div className="divide-y divide-neutral-300">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-300 rounded-sm flex-shrink-0" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-40 bg-neutral-300 rounded" />
                    <div className="h-3 w-24 bg-neutral-300 rounded" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-7 w-16 bg-neutral-300 rounded-sm" />
                  <div className="h-7 w-16 bg-neutral-300 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolios section */}
        <div className="bg-neutral-200 rounded-sm shadow-box border border-neutral-300 overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-300 flex items-center justify-between">
            <div className="h-5 w-36 bg-neutral-400 rounded" />
            <div className="h-7 w-24 bg-neutral-300 rounded-sm" />
          </div>
          <div className="divide-y divide-neutral-300">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between">
                <div className="space-y-1.5">
                  <div className="h-4 w-48 bg-neutral-300 rounded" />
                  <div className="h-3 w-32 bg-neutral-300 rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="h-7 w-20 bg-neutral-300 rounded-sm" />
                  <div className="h-7 w-16 bg-neutral-400 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}