import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminConsultationsClient from "./AdminConsultationsClient";
export const runtime = "edge";
export default async function AdminPage() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("FCH_ADMIN_TOKEN")?.value?.trim();

  if (!tokenCookie) {
    redirect("/admin/login");
  }

  return <AdminConsultationsClient />;
}