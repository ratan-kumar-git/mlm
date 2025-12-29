import AppSidebar from "@/components/sidebarAllComponent/AppSidebar";
import UserProfile from "@/components/sidebarAllComponent/UserProfile";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="w-full">
          <div className="h-16 bg-sidebar/90 flex items-center justify-between md:justify-end px-4">
            <SidebarTrigger className="md:hidden" />
            <UserProfile />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
