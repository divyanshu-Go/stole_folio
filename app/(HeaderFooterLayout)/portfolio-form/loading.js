// app/(HeaderFooterLayout)/portfolio-form/loading.js

export default function PortfolioFormLoading() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-3xl mx-auto">
        <div className="bg-neutral-300 shadow-box rounded-2xl p-8">

          {/* Title block */}
          <div className="text-center mb-10 space-y-3">
            <div className="h-8 w-64 bg-neutral-400 rounded mx-auto" />
            <div className="h-4 w-80 bg-neutral-400 rounded mx-auto" />
          </div>

          <div className="space-y-8">

            {/* Section: Personal Information */}
            <div>
              <div className="h-5 w-44 bg-neutral-400 rounded mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkeletonField />
                <SkeletonField />
              </div>
              <div className="mt-6">
                <div className="h-3 w-10 bg-neutral-400 rounded mb-1" />
                <div className="h-20 bg-neutral-200 border border-neutral-400 rounded-md" />
                <div className="h-3 w-20 bg-neutral-400 rounded mt-1" />
              </div>
            </div>

            {/* Section: Contact */}
            <div>
              <div className="h-5 w-44 bg-neutral-400 rounded mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkeletonField />
                <SkeletonField />
              </div>
            </div>

            {/* Section: Social */}
            <div>
              <div className="h-5 w-36 bg-neutral-400 rounded mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkeletonField />
                <SkeletonField />
                <SkeletonField />
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <div className="h-12 w-full bg-neutral-400 rounded-md" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonField() {
  return (
    <div className="space-y-1">
      <div className="h-3 w-20 bg-neutral-400 rounded" />
      <div className="h-9 bg-neutral-200 border border-neutral-400 rounded-md" />
    </div>
  );
}