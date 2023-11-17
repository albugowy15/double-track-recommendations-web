import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <h2 className="text-2xl font-bold">403 Forbidden</h2>
      <p>You do not have permission to access this page.</p>
      <Link href="/">
        <Button variant="outline">Return Home</Button>
      </Link>
    </div>
  );
}
