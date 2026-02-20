// app/(HeaderFooterLayout)/user-dashboard/page.jsx
import UserDashboardClient from "@/components/UserDashboardClient";
import { getUserContainers, getUserPortfolios } from "@/lib/api/api";

export default async function UserDashboard() {
  // Server-side data fetching
  const containers = await getUserContainers();
  const portfolios = await getUserPortfolios();

  // Pass the data to the client component
  return (
    <UserDashboardClient 
      containers={containers} 
      portfolios={portfolios} 
    />
  );
}