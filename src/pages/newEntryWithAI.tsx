"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { Sparkles } from "lucide-react";
import { NewEntryDialog } from "@/pages/newEntryDialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AIResponse {
  company: string;
  location: string;
  job_position: string;
  short_description: string;
}

export function NewEntryWithAI({ open, onOpenChange }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const [entryData, setEntryData] = useState<AIResponse | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return alert("Please enter a job description.");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8001/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed to fetch AI response");

      const data = await res.json();

      const parsedData: AIResponse = {
        company: data.company ?? "",
        location: data.location ?? "",
        job_position: data.job_position ?? "",
        short_description: data.short_description ?? "",
      };

      if (!parsedData.company && !parsedData.job_position) {
        throw new Error("AI returned empty response");
      }

      setEntryData(parsedData);

      onOpenChange(false);

      setShowDialog(true);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* AI INPUT DIALOG */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex flex-row items-center gap-2">
            <DialogTitle>Add new Entry with AI</DialogTitle>
            <Sparkles />
          </DialogHeader>

          <div className="grid gap-4 py-3">
            <Field>
              <FieldLabel>Feeling lazy to type?</FieldLabel>
              <Textarea
                placeholder="Paste job description here"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Field>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Processing AI..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* IMPORTANT: Only mount when BOTH are ready */}
      {showDialog && entryData !== null && (
        <NewEntryDialog
          key={JSON.stringify(entryData)} // force remount every time
          open={showDialog}
          onOpenChange={setShowDialog}
          initialData={{
            company: entryData.company,
            location: entryData.location,
            position: entryData.job_position,
            short_description: entryData.short_description,
          }}
        />
      )}
    </>
  );
}