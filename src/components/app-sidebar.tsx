import * as React from "react";
import { PanelBottomOpen } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthProvider";
import { Calendars } from "@/components/calendars";
import { NewEntryDialog } from "@/pages/newEntryDialog";
import { NewEntryWithAI } from "@/pages/newEntryWithAI";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading } = useAuth();
  const fullName = user?.user_metadata?.full_name || "Guest User";

  const data = {
    user: {
      name: fullName,
      email: user?.email || "Loading...",
      avatar: "/avatars/shadcn.jpg",
    },
    jobs: [
      {
        name: "My Job Applications",
        items: ["Interview", "Pending", "Job offer"],
      },
    ],
  };

  const [showDialog, setShowDialog] = React.useState(false);
  const [showAIDialog, setShowAIDialog] = React.useState(false);

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
          <DotLottieReact
            src="/orangCat.lottie"
            loop
            autoplay
            className="w-full"
          />
          <SidebarSeparator className="mx-0" />
          <Calendars calendars={data.jobs} />
        </SidebarContent>
        <SidebarSeparator className="mx-0" />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex gap-1">
                      <PanelBottomOpen />
                      <span>New Entry</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => setShowAIDialog(true)}>With AI</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setShowDialog(true)}>
                        Manually
                         <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Dialog Component */}
      <NewEntryDialog open={showDialog} onOpenChange={setShowDialog} />
      <NewEntryWithAI open={showAIDialog} onOpenChange={setShowAIDialog}  />
    </>
  );
}
