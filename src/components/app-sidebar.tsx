"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthProvider";
import { Calendars } from "@/components/calendars";
import { NewEntryDialog } from "@/pages/newEntryDialog";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading } = useAuth();
  const fullName = user?.user_metadata?.full_name || "Guest User";

  const data = {
    user: {
      name: fullName,
      email: user?.email || "Loading...",
      avatar: "/avatars/shadcn.jpg",
    },
    calendars: [
      {
        name: "My Job Applications",
        items: ["Interview", "Pending", "Job offer"],
      },
    ],
  };

  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <>
      <Sidebar {...props}>
        <SidebarHeader className="h-16 border-b border-sidebar-border">
          {!loading ? (
            <NavUser user={data.user} />
          ) : (
            <div className="p-4 text-sm text-muted-foreground">
              Loading user...
            </div>
          )}
        </SidebarHeader>

        <SidebarContent>
          <DotLottieReact src="/orangCat.lottie" loop autoplay className="w-full" />
          <SidebarSeparator className="mx-0" />
          <Calendars calendars={data.calendars} />
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setShowDialog(true)}>
                <Plus />
                <span>New Entry</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Dialog Component */}
      <NewEntryDialog open={showDialog} onOpenChange={setShowDialog} />
    </>
  );
}
