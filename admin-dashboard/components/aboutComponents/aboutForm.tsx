"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { FileUpload } from "../ui/file-upload";
import Image from "next/image";

export type AboutEntry = {
  id?: string;
  heading: string;
  paragraph: string;
  imageUrl: string;
};

interface AboutFormProps {
  onAdd: (entry: AboutEntry) => void;
  initialData?: AboutEntry;
  isEditing?: boolean;
  onCancelEdit?: () => void;
}

export default function AboutForm({
  onAdd,
  initialData,
  isEditing,
  onCancelEdit,
}: AboutFormProps) {
  const [form, setForm] = useState<AboutEntry>({
    heading: "",
    paragraph: "",
    imageUrl: "",
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setOpen(true);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.heading || !form.paragraph || !form.imageUrl) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await onAdd({ ...form, id: initialData?.id }); // ✅ wait for server

      toast.success(
        isEditing ? "Updated successfully!" : "Saved successfully!"
      );

      setForm({ heading: "", paragraph: "", imageUrl: "" });
      setOpen(false);
      onCancelEdit?.();
    } catch (err) {
      toast.error("Failed to save. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Update Your Details</h1>
        {!isEditing && (
          <DialogTrigger asChild>
            <Button variant="outline">Add New</Button>
          </DialogTrigger>
        )}
      </div>

      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit" : "Add"} About</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update your about section details."
                : "Fill in the details to add a new about section."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <LabelInputContainer>
              <Label htmlFor="heading">Heading</Label>
              <Input
                id="heading"
                name="heading"
                placeholder="Heading"
                value={form.heading}
                onChange={handleChange}
                disabled={loading}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="paragraph">Paragraph</Label>
              <Textarea
                id="paragraph"
                name="paragraph"
                placeholder="Paragraph"
                value={form.paragraph}
                onChange={handleChange}
                disabled={loading}
                className="resize-y"
              />
            </LabelInputContainer>

            {/* <LabelInputContainer>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={handleChange}
                disabled={loading}
              />
            </LabelInputContainer> */}

            {/* <FileUpload
              onChange={(url) =>
                setForm((prev) => ({ ...prev, imageUrl: url }))
              }
            /> */}
            <FileUpload
              folder="about-images"
              multiple={false}
              onChange={(urls: string[]) =>
                setForm((prev) => ({ ...prev, imageUrl: urls[0] || "" }))
              }
            />

            {form.imageUrl && (
              <div className="relative w-32 h-20">
                <Image
                  src={form.imageUrl}
                  alt="Preview"
                  fill
                  className="object-contain rounded"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                disabled={loading}
                onClick={onCancelEdit}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : isEditing ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-1", className)}>{children}</div>
);
