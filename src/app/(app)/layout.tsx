
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/Sidebar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="p-4 w-full">
        {children}
      </div>
    </SidebarProvider>

  );
}

export default layout;
