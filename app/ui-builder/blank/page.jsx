import UiBuilder from "@/components/UiBuilderComponents/UiBuilder";


export default async function UiBuilderPage() {
  
    const container = null;
  
  return (
    <div className="w-full flex flex-col ">
      <UiBuilder initialContainer={container} />
    </div>
  );
}