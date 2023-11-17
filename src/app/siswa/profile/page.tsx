import EditProfileForm from "@/app/siswa/profile/_components/edit-profil-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StudentProfilePage() {
  return (
    <main className="px-2 py-4">
      <Card className="mx-auto w-fit">
        <CardHeader>
          <CardTitle>Profil Siswa</CardTitle>
          <CardDescription>
            Berikut adalah profil Anda. Untuk merubah data profil, silahkan
            ganti data berikut kemudian klik Perbarui Profil.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditProfileForm
            defaultValues={{
              fullname: "Nama Siswa nya",
              username: "36463643",
              nisn: "36463643",
              password: "fe766343",
              school: "SMA IPIfeym Surabaya",
            }}
          />
        </CardContent>
      </Card>
    </main>
  );
}
