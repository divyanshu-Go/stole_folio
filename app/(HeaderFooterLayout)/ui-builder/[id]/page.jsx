import UIBuilder from '@/components/UiBuilderComponents/UiBuilder';
import { getContainerData } from '@/lib/api/api';


// Server component that fetches data and renders portfolio
export default async function PortfolioPageRoute({ params }) {
  const { id } = await params;
  const container = await getContainerData(id);

  // Convert Container instance to plain object for client component
  const containerData = container ? container.toJSON() : null;



  return (
      <div className="w-full flex flex-col ">
        <UIBuilder initialContainer={containerData} />
      </div>
    );
}