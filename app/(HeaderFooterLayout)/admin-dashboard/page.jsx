// app/(HeaderFooterLayout)/admin-dashboard/page.jsx
import { redirect } from "next/navigation";
import { getAllPortfoliosForAdmin, getUserProfile } from "@/lib/api/api";
import AdminDashboardClient from "@/components/WebsiteComponents/AdminDashboardClient";


export default async function AdminDashboardPage() {
  const user = await getUserProfile();

  // Guard — non-admins get bounced to home
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  const portfolios = await getAllPortfoliosForAdmin();

  return (
    <AdminDashboardClient initialPortfolios={portfolios ?? []} />
  );
}