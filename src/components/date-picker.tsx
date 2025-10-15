import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import React from "react";

export function DatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className={`
            [&_[role=gridcell].day-selected]:bg-gray-500 
            [&_[role=gridcell].day-selected]:text-black
            [&_[role=gridcell]]:w-[33px]
          `}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
