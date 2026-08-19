import { SidebarTrigger } from "@/components/ui/sidebar";
import { Moon, Bell } from "lucide-react";
export default function Header() {
  return (
    <header className="flex items-center justify-between sticky top-0 z-10 border py-3 bg-background">
      <SidebarTrigger className="[&>svg]:size-5! lg:flex" />
      <div className="flex space-x-2">
        <Moon size={20} />
        <Bell size={20} />
      </div>
    </header>
  );
}
