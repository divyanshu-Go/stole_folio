// app/(HeaderFooterLayout)/profile/page.jsx
import ProfileDashboard from "@/components/WebsiteComponents/ProfileDashboard";
import { getUserProfile } from "@/lib/api/api";

export default async function ProfilePage() {
  const user = await getUserProfile();
  

  return (
    <div className="mx-auto max-w-4xl w-full">
      <ProfileDashboard user={user}/>
    </div>
  );
}
