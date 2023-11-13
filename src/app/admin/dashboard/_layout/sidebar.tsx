import { Button } from "@/components/ui/button";
import { adminDashboardNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            {adminDashboardNavigation.map((item, index) => (
              <Button
                variant="ghost"
                className="w-full justify-start"
                key={index}
                asChild
              >
                <Link href={item.href}>
                  {item.icon}
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
