import EditAdminProfileForm from "@/app/admin/profil/edit/_components/edit-profile-form";

export default function EditAdminProfilePage() {
  const prevAdmin = {
    username: "admin",
    email: "admin@gmail.com",
    name: "admin",
    school_name: "SMA Kita",
    nik: "53543643743743",
  };

  return (
    <main className="px-3 pt-5 md:container">
      <EditAdminProfileForm prev={prevAdmin} />
    </main>
  );
}
