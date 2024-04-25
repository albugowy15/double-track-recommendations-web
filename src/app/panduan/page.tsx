import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Panduan",
  description: "Panduan aplikasi Rekomendasi Keterampilan Double Track",
};

export default function GuidePage() {
  return (
    <main className="px-3 py-5 md:container">
      <Typography variant="h2">
        Panduan Penggunaan Sistem Rekomendasi Keterampilan Double Track
      </Typography>
      <Typography variant="body1">
        Sistem Rekomendasi Keterampilan Double Track adalah sebuah aplikasi web
        yang diperuntukkan untuk para peserta program SMA/MA Double Track guna
        membantu dalam pemilihan program keterampilan yang akan siswa ikuti.
        Aplikasi ini akan memberikan ranking alternatif bidang keterampilan yang
        paling sesuai berdasarkan kusioner yang telah diisi.
      </Typography>
      <br />
      <Typography variant="h3">Panduan untuk Administrator</Typography>
      <Typography variant="body1">
        Setiap sekolah akan diberikan minimal 1 akun administrator.
        Administrator dapat login dengan membuka halaman{" "}
        <Link href="/auth/login" className="text-primary font-bold underline">
          Login
        </Link>{" "}
        kemudian memilih opsi <strong>Admin</strong> padat pilihan jenis login
        yang tersdia. Login menggunakan username dan password yang telah
        diberikan.
      </Typography>
      <Typography variant="body1">
        Setelah berhasil login, Administrator dapat:
      </Typography>
      <ul className="list-disc list-inside">
        <li>
          Melihat ringkasan statistik meliputi total siswa terdaftar, kuesioner
          diisi, dan persentase konsistensi kuesioner melalui menu{" "}
          <Link
            href="/admin/dashboard"
            className="text-primary font-bold underline"
          >
            Ringkasan
          </Link>
        </li>
        <li>
          Menambah, mengubah, serta menghapus akun siswa kedalam sistem melalui
          menu{" "}
          <Link
            href="/admin/dashboard/siswa"
            className="text-primary font-bold underline"
          >
            Siswa
          </Link>
        </li>
        <li>
          Mengisi nilai tingkat jumlah lapangan pekerjaan, gaji, dan peluang
          wirausaha untuk setiap keterampilan melalui menu{" "}
          <Link
            href="/admin/dashboard/kuesioner"
            className="text-primary font-bold underline"
          >
            Kuesioner
          </Link>
        </li>
        <li>
          Melihat serta menghapus hasil rekomendasi keterampilan setiap siswa
          melalui menu{" "}
          <Link
            href="/admin/dashboard/hasil-rekomendasi"
            className="text-primary font-bold underline"
          >
            Hasil Rekomendasi
          </Link>
        </li>
        <li>
          Atau melihat menu lainnya dengan menekan tombol{" "}
          <Button variant="outline" size="icon">
            <User />
          </Button>
        </li>
      </ul>

      <Typography variant="body1">
        Administrator wajib memverifikasi hasil rekomendasi yang diterima siswa
        apakah sudah mendapatkan hasil paling maksimal atau tidak dengan cara
        melihat pada nilai <strong>Rasio Konsistensi</strong>. Hasil rekomendasi
        yang baik adalah yang memiliki{" "}
        <strong>Rasio Konsistensi kurang dari 0,1</strong>. Apabila siswa
        memiliki rasio konsistensi kurang dari 0,1, Administrator diharapkan
        dapat mengarahkan siswa untuk mengisi ulang kuesioner hingga mendapatkan
        nilai konsistensi yang lebih baik.
      </Typography>
      <br />

      <Typography variant="h3">Panduan untuk Siswa</Typography>
      <Typography variant="body1">
        Siswa dapat login kedalam aplikasi menggunakan username dan password.
        Buka halaman{" "}
        <Link href="/auth/login" className="text-primary font-bold underline">
          Login
        </Link>
        , kemudian pilih opsi <strong>Siswa</strong>. Gunakan NISN sebagai
        username dan password untuk login awal. Apabila telah berhasil login,
        harap perbarui username dengan mengunjungi halaman{" "}
        <Link
          href="/siswa/profile"
          className="text-primary font-bold underline"
        >
          Profil
        </Link>
        . Untuk mengganti password, silahkan buka halaman{" "}
        <Link
          href="/siswa/ubah-password"
          className="text-primary font-bold underline"
        >
          Ubah Password
        </Link>
        .
      </Typography>
      <Typography variant="body1">
        Siswa yang telah berhasil login, dapat:
      </Typography>
      <ul className="list-inside list-disc">
        <li>
          Mengisi kuesioner preferensi di halaman{" "}
          <Link
            href="/siswa/kuesioner"
            className="text-primary font-bold underline"
          >
            Kuesioner
          </Link>
          . Siswa juga dapat mengulang mengisi kuesioner dengan menekan tombol{" "}
          <Button variant="default" size="sm">
            Ulang Kuesioner
          </Button>{" "}
          pada kuesioner yang telah diselesaikan sebelumnya.
        </li>
        <li>
          Melihat rekomendasi bidang keterampilan di halaman{" "}
          <Link
            href="/siswa/rekomendasi"
            className="text-primary font-bold underline"
          >
            Rekomendasi
          </Link>
        </li>
        <li>
          Atau melihat menu lainnya dengan menekan tombol{" "}
          <Button variant="outline" size="icon">
            <User />
          </Button>
        </li>
      </ul>

      <Typography variant="body1">
        Sangat disarankan siswa mengisi kuesioner dengan teliti agar mendapatkan
        hasil rekomendasi terbaik.
      </Typography>
    </main>
  );
}
