import AdminNav from "@/app/admin/dashboard/_layout/admin-nav";
import Typography from "@/components/typography";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Typography variant="h2">Dashboard</Typography>
      <Typography variant="body1">
        Berikut menu yang dapat Anda akses
      </Typography>
      <section className="py-4">
        <AdminNav />
      </section>
      <main>{children}</main>
    </>
  );
}
