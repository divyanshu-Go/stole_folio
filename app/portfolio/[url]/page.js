// app/portfolio/[url]/page.js
import PortfolioPage from "@/components/PortfolioPage";
import { getPortfolioById } from "@/lib/api/api";

export default async function DynamicPortfolioPage({ params }) {
  const { url } = await params;
  const portfolioData = await getPortfolioById(url);

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Portfolio Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The portfolio you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  const containerData = portfolioData.container.toJSON();
  return <PortfolioPage containerData={containerData} />;
}

// SEO Metadata
export async function generateMetadata({ params }) {
  const { url } = await params;
  const portfolioData = await getPortfolioById(url);

  if (!portfolioData) {
    return {
      title: "Portfolio Not Found",
      description: "The requested portfolio could not be found.",
    };
  }

  const { portfolio } = portfolioData;

  return {
    title: `${portfolio.title} | ${portfolio.author}`,
    description:
      portfolio.description ||
      `View ${portfolio.author}'s portfolio: ${portfolio.title}`,
    openGraph: {
      title: `${portfolio.title} | ${portfolio.author}`,
      description:
        portfolio.description ||
        `View ${portfolio.author}'s portfolio: ${portfolio.title}`,
      type: "website",
      url: `/portfolio/${portfolio.url}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${portfolio.title} | ${portfolio.author}`,
      description:
        portfolio.description ||
        `View ${portfolio.author}'s portfolio: ${portfolio.title}`,
    },
  };
}
