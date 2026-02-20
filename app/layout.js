// app/layout.js
import { MuseoModerno } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";


const museoModerno = MuseoModerno({
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
        className={`${museoModerno.className} text-lg min-h-screen flex flex-col`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
