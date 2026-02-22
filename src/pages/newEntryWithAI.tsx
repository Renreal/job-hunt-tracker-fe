"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { Sparkles } from "lucide-react";
import { NewEntryDialog } from "@/pages/newEntryDialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewEntryWithAI({ open, onOpenChange }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<{ company: string; location: string; job_position: string; short_description: string } | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return alert("Please enter a job description.");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed to fetch AI response");

      const data = await res.json();

      setAiResponse({
        company: data.company || "",
        location: data.location || "",
        job_position: data.job_position || "",
        short_description: data.short_description || "",
      });

      setShowDialog(true);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex flex-row items-center gap-2">
            <DialogTitle>Add new Entry with AI</DialogTitle> <Sparkles />
          </DialogHeader>

          <div className="grid gap-4 py-3">
            <Field>
              <FieldLabel htmlFor="textarea-message">Feeling lazy to type?</FieldLabel>
              <Textarea
                id="textarea-message"
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
              {loading ? "Processing..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* NewEntryDialog pre-filled with AI response */}
      {aiResponse && (
        <NewEntryDialog
          open={showDialog}
          onOpenChange={setShowDialog}
          initialData={{
            company: aiResponse.company,
            location: aiResponse.location,
            position: aiResponse.job_position,
            short_description: aiResponse.short_description,
          }}
        />
      )}
    </>
  );
}