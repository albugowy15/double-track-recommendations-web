import EditAdminProfileForm from "@/app/admin/profil/edit/_components/edit-profile-form";
import { protectedFetch } from "@/lib/api";
import { type AdminProfileResponse } from "../page";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profil Administrator",
};

export default async function EditAdminProfilePage() {
  const adminProfileResponse =
    await protectedFetch<AdminProfileResponse>("/v1/admin/profile");

  if (!adminProfileResponse?.data) return null;

  return (
    <main className="px-3 pt-5 md:container">
      <EditAdminProfileForm
        prev={{
          username: adminProfileResponse.data?.username,
          email: adminProfileResponse.data?.email,
          phone_number: adminProfileResponse.data?.phone_number,
        }}
      />
    </main>
  );
}
