// app/(HeaderFooterLayout)/portfolios/page.jsx
import { getPortfolios } from "@/lib/api/api";
import PortfolioGalleryClient from "@/components/PortfolioGalleryClient";

export default async function PortfolioGalleryPage() {
  const portfolios = await getPortfolios();

  if (!portfolios) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-neutral-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Gallery</h2>
          <p className="text-neutral-700">Failed to load portfolios. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">
            Portfolio Gallery
          </h1>
          <p className="text-neutral-600">
            Discover amazing portfolios created by our community. Find inspiration and use templates for your own projects.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6">
          <div className="bg-neutral-100 rounded-sm shadow-box p-4 border border-neutral-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Available Portfolios</p>
                <p className="text-2xl font-semibold text-neutral-800">
                  {portfolios.length}
                </p>
              </div>
              <div className="text-neutral-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Sort bar + Grid — client component owns interactivity */}
        <PortfolioGalleryClient portfolios={portfolios} />

        {/* Footer CTA */}
        {portfolios.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-white rounded-sm shadow-box border border-neutral-300 p-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                Ready to showcase your work?
              </h2>
              <p className="text-neutral-600 mb-6">
                Create your own portfolio and join our community of creators.
              </p>
              <button className="bg-neutral-800 text-white px-6 py-3 rounded-sm button-box transition-colors hover:bg-neutral-700">
                Get Started
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}