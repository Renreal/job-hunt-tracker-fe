import { DashboardProvider } from "../context/DashboardContext";
import { AppSidebar } from "../components/app-sidebar";
import LandingDashboard from "./Dashboard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {Search } from "lucide-react"

const today = new Date();
const formattedDate = today.toLocaleDateString("en-US", {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
});
export default function Home() {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div style={{display: "flex", gap: "5rem", width: "100%"}}>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>{formattedDate}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
              
            </div>
            
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
           <div className="flex justify-end">
            <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <InputGroup>
                      <InputGroupInput placeholder="search company name..." />
                      <InputGroupAddon>
                        <Search />
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end">
                        12 results
                      </InputGroupAddon>
                    </InputGroup>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
          </div> 
            <LandingDashboard />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </DashboardProvider>
  );
}
