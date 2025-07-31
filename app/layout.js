import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/WebsiteComponents/Header";
import Footer from "@/components/WebsiteComponents/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});


export const metadata = {
  title: "StoleFolio",
  description: "Custom portfolio builder using Stole UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} text-lg font-[Poppins] min-h-screen flex flex-col`}
      >
        {/* <Header/> */}
        {children}
        {/* <Footer/> */}
      </body>
    </html>
  );
}
