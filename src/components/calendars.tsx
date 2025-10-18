import * as React from "react";
import { Check, ChevronRight } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

export function Calendars({
  calendars,
}: {
  calendars: {
    name: string;
    items: string[];
  }[];
}) {
    const { selectedItems, toggleItem } = useDashboard();

  // const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  // const toggleItem = (item: string) => {
  //   setSelectedItems((prev) =>
  //     prev.includes(item)
  //       ? prev.filter((i) => i !== item)
  //       : [...prev, item]
  //   );
  // };

  return (
    <>
      {calendars.map((calendar, index) => (
        <React.Fragment key={calendar.name}>
          <SidebarGroup className="py-0">
            <Collapsible defaultOpen={index === 0} className="group/collapsible">
              <SidebarGroupLabel
                asChild
                className="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {calendar.name}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {calendar.items.map((item) => {
                      const isSelected = selectedItems.includes(item);
                      return (
                        <SidebarMenuItem key={item}>
                          <SidebarMenuButton
                            onClick={() => toggleItem(item)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <div
                              data-active={isSelected}
                              className={`group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border text-sidebar-primary-foreground
                                ${
                                  isSelected
                                    ? "border-sidebar-primary bg-sidebar-primary"
                                    : "hover:bg-sidebar-accent"
                                }`}
                            >
                              <Check
                                className={`size-3 ${
                                  isSelected ? "block" : "hidden"
                                }`}
                              />
                            </div>
                            {item}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
          <SidebarSeparator className="mx-0" />
        </React.Fragment>
      ))}
    </>
  );
}
