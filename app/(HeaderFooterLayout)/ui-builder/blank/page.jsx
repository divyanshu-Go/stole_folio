import UiBuilder from "@/components/UiBuilderComponents/UiBuilder";
import { getUserProfile } from "@/lib/api/api";

export default async function UiBuilderPage() {
  const containerA = null;
    const user = await getUserProfile();
  


  return (
    <div className="w-full flex flex-col ">
      <UiBuilder initialContainer={containerA} user={user} />
    </div>
  );
}
