import Test from "@/components/Test";
import UiBuilder from "@/components/UiBuilder";
import Container from "@/models/Container";
import DbConnect from "@/lib/db/DbConnect";




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

export default async function UiBuilderPage() {

  let initialContainer = null;

  try {
    // Connect to database
    await DbConnect();


    
      // Fetch specific container
      const containerDoc = await Container.findOne({}).sort({createdAt: -1}).lean();
      initialContainer = containerDoc ? convertToPlainObject(containerDoc) : null;
      
    
  } catch (error) {
    console.error('Error fetching container:', error);
    // Don't throw error, just use default container
  }




const Header = undefined;











  return (
    <div className="w-full flex flex-col ">
      <UiBuilder initialContainer={initialContainer} />
      {/* <Test/> */}
    </div>
  );
}
