import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen px-5 space-y-5 flex flex-col">
        <Header />
        <div className="flex-1 min-h-0">{children}</div>
      </main>
    </SidebarProvider>
  );
}
