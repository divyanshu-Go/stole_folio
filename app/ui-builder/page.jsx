import UiBuilder from "@/components/UiBuilderComponents/UiBuilder";
import Container from '@/components/ContainerClass';
import { convertToPlainObject, fillContainerWithFormData } from "@/lib/utils/container";

async function getPortfolioData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/containers/6882b87c492ab7ddc4fa2ddd`, {
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

export default async function UiBuilderPage({ searchParams }) {
  const container = await getPortfolioData();
  
  // Extract form data from URL parameters
  const formData = searchParams ? {
    name: searchParams.name || '',
    profession: searchParams.profession || '',
    bio: searchParams.bio || '',
    email: searchParams.email || '',
    phone: searchParams.phone || '',
    github: searchParams.github || '',
    linkedin: searchParams.linkedin || '',
    instagram: searchParams.instagram || ''
  } : null;

  // Only fill container with form data if we have form data and a container
  if (container && formData) {
    fillContainerWithFormData(container, formData);
  }

  // Convert Container instance to plain object for client component
  const containerData = container ? container.toJSON() : null;
  
  return (
    <div className="w-full flex flex-col ">
      <UiBuilder initialContainer={containerData} />
    </div>
  );
}