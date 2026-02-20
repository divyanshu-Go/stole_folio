// app/(HeaderFooterLayout)/layout.js
import Footer from "@/components/WebsiteComponents/Footer";
import Header from "@/components/WebsiteComponents/Header";
import { getUserProfile } from "@/lib/api/api";

export default async function HeaderFooterLayout({ children }) {
  const user = await getUserProfile();
  return (
    <>
      <Header user={user} />
      <main className=" px-2 py-6">{children}</main>
      <Footer />
    </>
  );
}
