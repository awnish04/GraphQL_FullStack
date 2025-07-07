"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { createAbout } from "../api/graphql";

export default function AboutForm() {
  const [form, setForm] = useState({
    heading: "",
    paragraph: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Handle input changes for text and textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Form submit handler with validation
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    // Basic validation
    if (!form.heading || !form.paragraph || !form.imageUrl) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      await createAbout(form);
      alert("About section saved!");
      setForm({ heading: "", paragraph: "", imageUrl: "" }); // Reset form
    } catch (err) {
      setError("Failed to save. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-black">
      <h2 className="mb-4 text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Edit About Section
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <LabelInputContainer>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
            disabled={loading}
          />
        </LabelInputContainer>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full rounded-md bg-gradient-to-br from-black to-neutral-600 py-2 text-white font-medium shadow-md",
            loading && "opacity-60 cursor-not-allowed"
          )}
        >
          {loading ? "Saving..." : "Save About"}
        </button>
      </form>
    </div>
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
