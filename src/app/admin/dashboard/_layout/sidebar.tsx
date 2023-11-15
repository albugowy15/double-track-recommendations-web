import { Button } from "@/components/ui/button";
import { adminDashboardNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-1 px-3 py-2">
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
  );
}
