// app/(HeaderFooterLayout)/admin-dashboard/loading.js

export default function AdminDashboardLoading() {
  return (
    <div className="min-h-screen p-6 animate-pulse">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="space-y-2">
          <div className="h-8 w-56 bg-neutral-300 rounded" />
          <div className="h-4 w-80 bg-neutral-300 rounded" />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-neutral-300 rounded-lg shadow-box border border-neutral-400 p-4 flex items-center justify-between">
              <div className="space-y-1.5">
                <div className="h-3 w-28 bg-neutral-400 rounded" />
                <div className="h-8 w-10 bg-neutral-400 rounded" />
              </div>
              <div className="w-5 h-5 bg-neutral-400 rounded" />
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="bg-neutral-300 rounded-lg shadow-box border border-neutral-400 overflow-hidden">
          <div className="h-1.5 w-full bg-neutral-400 rounded-t" />

          {/* Tabs */}
          <div className="flex gap-1 px-5 pt-4 pb-0 border-b border-neutral-400">
            {[70, 52, 60].map((w, i) => (
              <div key={i} className={`h-8 bg-neutral-400 rounded-t-md`} style={{ width: `${w}px` }} />
            ))}
          </div>

          {/* Table rows */}
          <div className="divide-y divide-neutral-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-5 py-4 flex items-center justify-between gap-4">
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-40 bg-neutral-400 rounded" />
                  <div className="h-3 w-56 bg-neutral-300 rounded" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-3 w-24 bg-neutral-400 rounded" />
                  <div className="h-3 w-32 bg-neutral-300 rounded" />
                </div>
                <div className="h-3 w-20 bg-neutral-300 rounded" />
                <div className="h-3 w-20 bg-neutral-300 rounded" />
                <div className="h-5 w-16 bg-neutral-400 rounded-full" />
                <div className="flex gap-2">
                  <div className="h-7 w-20 bg-neutral-400 rounded-sm" />
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