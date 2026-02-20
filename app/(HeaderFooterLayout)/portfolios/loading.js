// app/(HeaderFooterLayout)/portfolios/loading.js

export default function PortfoliosLoading() {
  return (
    <div className="min-h-screen bg-neutral-50 p-6 animate-pulse">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 space-y-2">
          <div className="h-8 w-56 bg-neutral-300 rounded" />
          <div className="h-4 w-96 bg-neutral-300 rounded" />
        </div>

        {/* Stats bar */}
        <div className="mb-6">
          <div className="bg-neutral-100 rounded-sm shadow-box p-4 border border-neutral-300">
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <div className="h-3 w-32 bg-neutral-300 rounded" />
                <div className="h-7 w-10 bg-neutral-300 rounded" />
              </div>
              <div className="w-8 h-8 bg-neutral-300 rounded" />
            </div>
          </div>
        </div>

        {/* Sort bar */}
        <div className="mb-6">
          <div className="bg-white rounded-sm shadow-box border border-neutral-300 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-4 w-14 bg-neutral-200 rounded" />
                <div className="h-7 w-32 bg-neutral-200 rounded" />
              </div>
              <div className="h-4 w-28 bg-neutral-200 rounded" />
            </div>
          </div>
        </div>

        {/* Card grid — 4 columns of skeleton cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-neutral-100 rounded-sm shadow-box border border-neutral-300 overflow-hidden">
      {/* Preview area */}
      <div className="h-32 bg-neutral-200 border-b border-neutral-300" />

      {/* Info */}
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-2 space-y-1.5">
            <div className="h-4 w-3/4 bg-neutral-300 rounded" />
            <div className="h-3 w-full bg-neutral-200 rounded" />
            <div className="flex gap-3">
              <div className="h-3 w-16 bg-neutral-200 rounded" />
              <div className="h-3 w-20 bg-neutral-200 rounded" />
            </div>
          </div>
          <div className="w-6 h-6 bg-neutral-300 rounded flex-shrink-0" />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          <div className="flex-1 h-7 bg-neutral-300 rounded-sm" />
          <div className="flex-1 h-7 bg-neutral-300 rounded-sm" />
        </div>

        {/* Metadata */}
        <div className="mt-2 pt-2 border-t border-neutral-200">
          <div className="h-3 w-28 bg-neutral-200 rounded" />
        </div>
      </div>
    </div>
  );
}