// app/(HeaderFooterLayout)/ui-builder/loading.js
// Mirrors the split-pane layout: left = preview, right = CSS controls panel

export default function UiBuilderLoading() {
  return (
    <div className="w-full flex flex-col animate-pulse">

      {/* Top toolbar strip */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-300 bg-neutral-200">
        <div className="flex items-center gap-3">
          <div className="h-7 w-24 bg-neutral-300 rounded-sm" />
          <div className="h-7 w-20 bg-neutral-300 rounded-sm" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-7 w-16 bg-neutral-300 rounded-sm" />
          <div className="h-7 w-20 bg-neutral-400 rounded-sm" />
        </div>
      </div>

      {/* Split pane body */}
      <div className="flex flex-1 min-h-[calc(100vh-7rem)]">

        {/* Left — live preview panel */}
        <div className="flex-1 bg-neutral-50 border-r border-neutral-300 p-4 flex flex-col gap-3">
          {/* Mock content blocks inside preview */}
          <div className="h-16 bg-neutral-200 rounded" />
          <div className="flex gap-3">
            <div className="flex-1 h-32 bg-neutral-200 rounded" />
            <div className="flex-1 h-32 bg-neutral-200 rounded" />
          </div>
          <div className="h-10 bg-neutral-200 rounded" />
          <div className="h-24 bg-neutral-200 rounded" />
          <div className="h-8 w-1/3 bg-neutral-300 rounded" />
        </div>

        {/* Right — controls / CSS editor panel */}
        <div className="w-80 bg-neutral-200 border-l border-neutral-300 p-4 flex flex-col gap-4 flex-shrink-0">

          {/* Panel section header */}
          <div className="h-5 w-32 bg-neutral-400 rounded" />

          {/* Property rows */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-3 w-24 bg-neutral-400 rounded" />
              <div className="h-8 bg-neutral-300 border border-neutral-400 rounded" />
            </div>
          ))}

          {/* Color swatches row */}
          <div className="flex gap-2 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-7 h-7 rounded-full bg-neutral-400" />
            ))}
          </div>

          {/* Spacer + apply button at bottom */}
          <div className="mt-auto">
            <div className="h-9 w-full bg-neutral-400 rounded-sm" />
          </div>

        </div>
      </div>
    </div>
  );
}