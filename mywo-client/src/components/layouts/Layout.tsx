import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-screen overflow-y-auto">
        <Header />

        <div className="flex-1 py-5 px-2 sm:px-5">{children}</div>
      </main>
    </SidebarProvider>
  );
}
