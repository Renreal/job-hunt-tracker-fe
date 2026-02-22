"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateUser } from "@/hooks/useCreateUser";
import { Calendar28 } from "@/components/Calendar28";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    company?: string;
    location?: string;
    position?: string;
    short_description?: string;
  };
}

export function NewEntryDialog({ open, onOpenChange, initialData }: Props) {
  const { mutate: createUser, isPending } = useCreateUser();

  const [formData, setFormData] = useState({
    company: "",
    location: "",
    platform: "",
    position: "",
    status: "",
    short_description: "",
    date: new Date().toISOString(),
  });

  // IMPORTANT: reset form every time dialog opens
  useEffect(() => {
    if (open && initialData) {
      setFormData({
        company: initialData.company ?? "",
        location: initialData.location ?? "",
        platform: "",
        position: initialData.position ?? "",
        status: "",
        short_description: initialData.short_description ?? "",
        date: new Date().toISOString(),
      });
    }
  }, [open, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    createUser(formData, {
      onSuccess: () => onOpenChange(false),
      onError: (err: any) =>
        alert(`Error creating entry: ${err.message}`),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Job Application</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-3">
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" value={formData.company} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={formData.location} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="platform">Platform</Label>
            <Input id="platform" value={formData.platform} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="position">Position</Label>
            <Input id="position" value={formData.position} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="short_description">Job Description</Label>
            <Input
              id="short_description"
              value={formData.short_description}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Status</Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
              value={formData.status}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="job offer">Job Offer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Calendar28
            value={formData.date}
            onChange={(newDate) =>
              setFormData((prev) => ({ ...prev, date: newDate }))
            }
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Saving..." : "Create Entry"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}