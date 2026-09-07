import { SidebarTrigger } from "@/components/ui/sidebar";
import { Moon, Bell } from "lucide-react";
export default function Header() {
  return (
    <header className="flex items-center justify-between sticky top-0 z-10 border-b h-16 shrink-0 bg-background px-2 sm:px-5">
      <SidebarTrigger className="[&>svg]:size-5! lg:flex" />
      <div className="flex space-x-2">
        <Moon size={20} />
        <Bell size={20} />
      </div>
    </header>
  );
}
