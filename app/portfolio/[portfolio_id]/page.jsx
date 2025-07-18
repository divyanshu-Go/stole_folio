import PortfolioPage from '@/components/PortfolioPage';
import Container from '@/components/ContainerClass';

// Convert database object to Container instance
const convertToPlainObject = (doc) => {
  if (!doc) return null;
  return {
    name: doc.name,
    container_Id: doc.container_Id,
    type: doc.type,
    text: doc.text,
    styles: doc.styles || {},
    hoverStyles: doc.hoverStyles || {},
    children: doc.children ? doc.children.map(child => convertToPlainObject(child)) : [null, null, null, null],
    locked: doc.locked || false,
    hidden: doc.hidden || false
  };
};

// Fetch portfolio data server-side
async function getPortfolioData(portfolioId) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/containers/${portfolioId}`, {
      cache: 'no-store' // Ensure fresh data
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    
    if (result.success) {
      // Convert to Container instance
      const plainObject = convertToPlainObject(result.data);
      return Container.fromJSON(plainObject);
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return null;
  }
}

// Server component that fetches data and renders portfolio
export default async function PortfolioPageRoute({ params }) {
  const { portfolio_id } = await params;
  const container = await getPortfolioData(portfolio_id);

  // Convert Container instance to plain object for client component
  const containerData = container ? container.toJSON() : null;


  return <PortfolioPage containerData={containerData} />;
}

// Optional: Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { portfolio_id } = await params;
  const container = await getPortfolioData(portfolio_id);

  return {
    title: container?.name || 'Portfolio',
    description: `View ${container?.name || 'this'} portfolio`,
  };
}