import { Sidebar } from "@/app/admin/dashboard/_layout/sidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid lg:grid-cols-6">
        {/* Sidebar */}
        <Sidebar className="hidden lg:block" />
        <div className="col-span-3 lg:col-span-5">
          <div className="h-full px-4 py-6 lg:px-8">{children}</div>
        </div>
      </div>
    </>
  );
}
