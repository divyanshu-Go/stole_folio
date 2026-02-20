import UiBuilder from "@/components/UiBuilderComponents/UiBuilder";
import { getContainerData, getUserProfile } from "@/lib/api/api";
import { fillContainerWithFormData } from "@/lib/utils/container";


export default async function UiBuilderPage({ searchParams }) {
  const container = await getContainerData("69987b423b795a63689fb75f");
  const user = await getUserProfile();
  
  // Extract form data from URL parameters
  const awaitedSearchParam = await searchParams;
  const formData = awaitedSearchParam ? {
    name: awaitedSearchParam.name || '',
    profession: awaitedSearchParam.profession || '',
    bio: awaitedSearchParam.bio || '',
    email: awaitedSearchParam.email || '',
    phone: awaitedSearchParam.phone || '',
    github: awaitedSearchParam.github || '',
    linkedin: awaitedSearchParam.linkedin || '',
    instagram: awaitedSearchParam.instagram || ''
  } : null;

  // Only fill container with form data if we have form data and a container
  if (container && formData) {
    fillContainerWithFormData(container, formData);
  }

  // Convert Container instance to plain object for client component
  const containerData = container ? container.toJSON() : null;
  
  return (
    <div className="w-full flex flex-col ">
      <UiBuilder initialContainer={containerData} user={user} />
    </div>
  );
}