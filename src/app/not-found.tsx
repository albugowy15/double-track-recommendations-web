import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <h2 className="text-2xl font-bold">404 Not Found</h2>
      <Link href="/">
        <Button variant="outline">Return Home</Button>
      </Link>
    </div>
  );
}
