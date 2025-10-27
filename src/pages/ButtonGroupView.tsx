"use client";

import { useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface UserData {
  company: string;
  location: string;
  platform: string;
  position: string;
  status: string;
  date: string;
}

export function ButtonGroupView({ user }: { user: UserData }) {
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const formatDate = (isoString: string) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(isoString));

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Open menu" size="icon">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setShowViewDialog(true)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {user.company} | {user.position}
              <p className="text-xs mt-1">Applied via {user.platform}</p>
            </DialogTitle>
            <DialogDescription className="mt-3">
              <p className="text-base font-bold">
                {user.location} — Status: {user.status}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {formatDate(user.date)}
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
            <DialogDescription>
              Update details for <strong>{user.company}</strong>.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-3">
            <Field>
              <Label htmlFor="position">Position</Label>
              <Input id="position" defaultValue={user.position} />
            </Field>
            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Input id="status" defaultValue={user.status} />
            </Field>
            <Field>
              <FieldLabel htmlFor="platform">Platform</FieldLabel>
              <Input id="platform" defaultValue={user.platform} />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
