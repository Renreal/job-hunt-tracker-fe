"use client";

import * as React from "react";
import { ChevronDownIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Calendar24Props {
  value?: string | Date;
  onChange?: (value: string) => void;
}

export function Calendar28({ value, onChange }: Calendar24Props) {
  const [open, setOpen] = React.useState(false);

  // initialize from value if given
  const initialDate = value ? new Date(value) : undefined;
  const [date, setDate] = React.useState<Date | undefined>(initialDate);
  const [time, setTime] = React.useState<string>(() => {
    if (!initialDate) return "00:00:00";
    const hh = String(initialDate.getHours()).padStart(2, "0");
    const mm = String(initialDate.getMinutes()).padStart(2, "0");
    const ss = String(initialDate.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  });

  // combine date and time into full ISO timestamp
  React.useEffect(() => {
    if (!date || !onChange) return;

    const [hh, mm, ss] = time.split(":").map(Number);
    const combined = new Date(date);
    combined.setHours(hh);
    combined.setMinutes(mm);
    combined.setSeconds(ss);

    onChange(combined.toISOString());
  }, [date, time]);

  // keep internal state synced when `value` changes externally
  React.useEffect(() => {
    if (!value) return;
    const d = new Date(value);
    setDate(d);
    setTime(
      `${String(d.getHours()).padStart(2, "0")}:${String(
        d.getMinutes()
      ).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`
    );
  }, [value]);

  return (
    <div className="flex gap-4">
      {/* DATE PICKER */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-40 justify-between font-normal"
            >
              {date
                ? date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(d) => {
                if (d) {
                  setDate(d);
                  setOpen(false);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* TIME PICKER */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          Time
        </Label>
        <div className="relative">
          <Clock className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="time"
            id="time-picker"
            step="1"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
            className="pl-8 w-32 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
          />
        </div>
      </div>
    </div>
  );
}
