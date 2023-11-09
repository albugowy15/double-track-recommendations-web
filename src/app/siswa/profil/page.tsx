import EditProfileForm from "@/app/siswa/profil/_components/edit-profil-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StudentProfilePage() {
  return (
    <Card className="mx-auto w-fit">
      <CardHeader>
        <CardTitle>Profil Siswa</CardTitle>
        <CardDescription>
          Berikut adalah profil Anda. Untuk merubah data profil, silahkan ganti
          data berikut kemudian klik Perbarui Profil.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EditProfileForm
          defaultValues={{
            fullname: "Nama Siswa nya",
            nisn: "36463643",
            password: "fe766343",
            school: "SMA IPIfeym Surabaya",
          }}
        />
      </CardContent>
    </Card>
  );
}
