"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileUpload } from "../ui/file-upload";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export type ProjectEntry = {
  id?: string;
  title: string;
  description: string;
  imageUrls: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
};

interface ProjectFormProps {
  onAdd: (entry: ProjectEntry) => void;
  initialData?: ProjectEntry;
  isEditing?: boolean;
  onCancelEdit?: () => void;
}

const availableTech = [
  "Next.js",
  "Tailwind",
  "GraphQL",
  "MongoDB",
  "TypeScript",
];

export default function ProjectForm({
  onAdd,
  initialData,
  isEditing,
  onCancelEdit,
}: ProjectFormProps) {
  const [form, setForm] = useState<ProjectEntry>({
    title: "",
    description: "",
    imageUrls: [],
    techStack: [],
    githubUrl: "",
    liveUrl: "",
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setOpen(true);
    }
  }, [initialData]);

  const handleTechToggle = (tech: string) => {
    setForm((prev) => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter((t) => t !== tech)
        : [...prev.techStack, tech],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.imageUrls.length) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      await onAdd({ ...form, id: initialData?.id });
      toast.success(
        isEditing ? "Updated successfully!" : "Saved successfully!"
      );
      setForm({
        title: "",
        description: "",
        imageUrls: [],
        techStack: [],
        githubUrl: "",
        liveUrl: "",
      });
      setOpen(false);
      onCancelEdit?.();
    } catch (err) {
      toast.error("Failed to save. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  console.log("Form values being submitted:", form);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Projects</h1>
        {!isEditing && (
          <DialogTrigger asChild>
            <Button variant="outline">Add Project</Button>
          </DialogTrigger>
        )}
      </div>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit" : "Add"} Project</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update your project info."
                : "Fill the details to add a new project."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Label>Title</Label>
            <Input
              name="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Label>Description</Label>
            <Textarea
              name="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <Label>Tech Stack</Label>
            <div className="flex flex-wrap gap-2">
              {availableTech.map((tech) => (
                <Badge
                  key={tech}
                  variant={
                    form.techStack.includes(tech) ? "default" : "outline"
                  }
                  onClick={() => handleTechToggle(tech)}
                  className="cursor-pointer"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <Label>GitHub URL</Label>
            <Input
              name="githubUrl"
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            />

            <Label>Live URL</Label>
            <Input
              name="liveUrl"
              value={form.liveUrl}
              onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
            />

            <FileUpload
              folder="project-images"
              multiple
              onChange={
                (urls: string[]) =>
                  setForm((prev) => ({ ...prev, imageUrls: urls }))
                // setForm((prev) => ({ ...prev, imageUrl: urls[0] || "" }))
              }
            />

            <div className="flex gap-2 flex-wrap">
              {form.imageUrls.map((url, idx) => (
                <div
                  key={idx}
                  className="relative w-28 h-20 rounded overflow-hidden"
                >
                  <Image
                    src={url}
                    alt="preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={onCancelEdit}
                disabled={loading}
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
