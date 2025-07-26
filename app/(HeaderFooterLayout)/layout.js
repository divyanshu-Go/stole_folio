import Footer from "@/components/WebsiteComponents/Footer";
import Header from "@/components/WebsiteComponents/Header";

export default function HeaderFooterLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
