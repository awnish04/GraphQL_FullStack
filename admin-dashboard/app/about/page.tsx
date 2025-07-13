"use client";

import React, { useEffect, useState } from "react";
import AboutForm, { AboutEntry } from "@/components/aboutComponents/aboutForm";
import AboutTable from "@/components/aboutComponents/aboutTable";
import {
  createAbout,
  deleteAbout,
  getAbout,
  updateAbout,
} from "@/pages/api/graphql";
import { toast } from "sonner";

export default function AboutPage() {
  const [entries, setEntries] = useState<AboutEntry[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAbout();
        setEntries(data);
      } catch (error) {
        console.error("Failed to load about data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddOrEdit = async (entry: AboutEntry) => {
    try {
      if (entry.id) {
        const updatedEntry = await updateAbout(entry.id, {
          heading: entry.heading,
          paragraph: entry.paragraph,
          imageUrl: entry.imageUrl,
        });

        setEntries((prev) =>
          prev.map((e) => (e.id === entry.id ? updatedEntry : e))
        );
      } else {
        const newEntry = await createAbout(entry);
        setEntries((prev) => [...prev, newEntry]);
      }

      setEditingIndex(null);
    } catch (err) {
      console.error("Error updating about entries:", err);
      toast.error("Something went wrong.");
    }
  };

  const handleEdit = (entry: AboutEntry, index: number) => {
    setEditingIndex(index);
  };

  const handleDelete = async (index: number) => {
    const entry = entries[index];
    if (!entry?.id) return;

    try {
      await deleteAbout(entry.id);
      setEntries((prev) => prev.filter((_, i) => i !== index));
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error("Failed to delete.");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <AboutForm
        onAdd={handleAddOrEdit}
        initialData={editingIndex !== null ? entries[editingIndex] : undefined}
        isEditing={editingIndex !== null}
        onCancelEdit={() => setEditingIndex(null)}
      />
      <AboutTable
        entries={entries}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
