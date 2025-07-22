import UiBuilder from "@/components/UiBuilderComponents/UiBuilder";
import Container from "@/models/Container";
import DbConnect from "@/lib/db/DbConnect";
import { convertToPlainObject } from "@/lib/utils/container";



export default async function UiBuilderPage() {

  let initialContainer = null;

  try {
    // Connect to database
    await DbConnect();

      let name= "shyam";
    
      // Fetch specific container
      const containerDoc = await Container.findOne({}).sort({createdAt: -1}).lean();
      initialContainer = containerDoc ? convertToPlainObject(containerDoc) : null;
      initialContainer.text = name;
    
  } catch (error) {
    console.error('Error fetching container:', error);
    // Don't throw error, just use default container
  }




const navbarContainer = {
  container_Id: "nav-001",
  name: "Navbar",
  type: "div",
  text: "",
  styles: {
    width: "100%",
    height: "60px",
    backgroundColor: "#ffffff",
    color: "#333333",
    padding: "0 24px",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
  },
  hoverStyles: {},
  children: [
    {
      container_Id: "nav-logo",
      name: "Logo",
      type: "div",
      text: "MyPortfolio",
      styles: {
        fontSize: "1.25rem",
        fontWeight: "bold",
        color: "#111827"
      },
      hoverStyles: {},
      children: [null, null, null, null],
      locked: false,
      hidden: false
    },
    {
      container_Id: "nav-links",
      name: "NavLinks",
      type: "div",
      text: "",
      styles: {
        display: "flex",
        gap: "24px"
      },
      hoverStyles: {},
      children: [
        {
          container_Id: "link-home",
          name: "Home",
          type: "a",
          text: "Home",
          styles: {
            color: "#374151",
            fontSize: "0.875rem",
            textDecoration: "none"
          },
          hoverStyles: {
            color: "#1d4ed8"
          },
          children: [null, null, null, null],
          locked: false,
          hidden: false,
          linkUrl: "#home",
          isClickable: true
        },
        {
          container_Id: "link-about",
          name: "About",
          type: "a",
          text: "About",
          styles: {
            color: "#374151",
            fontSize: "0.875rem",
            textDecoration: "none"
          },
          hoverStyles: {
            color: "#1d4ed8"
          },
          children: [null, null, null, null],
          locked: false,
          hidden: false,
          linkUrl: "#about",
          isClickable: true
        },
        {
          container_Id: "link-projects",
          name: "Projects",
          type: "a",
          text: "Projects",
          styles: {
            color: "#374151",
            fontSize: "0.875rem",
            textDecoration: "none"
          },
          hoverStyles: {
            color: "#1d4ed8"
          },
          children: [null, null, null, null],
          locked: false,
          hidden: false,
          linkUrl: "#projects",
          isClickable: true
        },
        {
          container_Id: "link-contact",
          name: "Contact",
          type: "a",
          text: "Contact",
          styles: {
            color: "#374151",
            fontSize: "0.875rem",
            textDecoration: "none"
          },
          hoverStyles: {
            color: "#1d4ed8"
          },
          children: [null, null, null, null],
          locked: false,
          hidden: false,
          linkUrl: "#contact",
          isClickable: true
        }
      ],
      locked: false,
      hidden: false
    },
    null,
    null
  ],
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
