import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminConsultationsClient from "./AdminConsultationsClient";

export const runtime = "edge";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authed = cookieStore.get("FCH_ADMIN_AUTH")?.value?.trim();

  if (authed !== "1") {
    redirect("/admin/login");
  }

  return <AdminConsultationsClient />;
}