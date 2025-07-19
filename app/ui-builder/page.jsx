import UiBuilder from "@/components/UiBuilderComponents/UiBuilder";
import Container from "@/models/Container";
import DbConnect from "@/lib/db/DbConnect";
import { convertToPlainObject } from "@/lib/utils/container";



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




const buttonContainer = {
  container_Id: "btn-001",
  name: "PrimaryButton",
  type: "button",
  text: "Click Me",
  styles: {
    width: "150px",
    height: "40px",
    backgroundColor: "#007bff", // only few styles
    color: "#ffffff",
    margin:"50px"
  },
  hoverStyles: {
    backgroundColor: "#0056b3",

    // others missing, will fallback from class defaults
  },
  children: [null,null,null,null],
  locked: false,
  hidden: false
};


const Temp = undefined






  return (
    <div className="w-full flex flex-col ">
      <UiBuilder initialContainer={Temp} />
    </div>
  );
}
