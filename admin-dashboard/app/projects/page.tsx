// ✅ /admin-dashboard/app/projects/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "@/pages/api/graphql";
import ProjectForm, { ProjectEntry } from "@/components/projectsComponents/ProjectForm";
import ProjectTable from "@/components/projectsComponents/ProjectTable";


export default function ProjectsPage() {
  const [entries, setEntries] = useState<ProjectEntry[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects();
        setEntries(data);
      } catch (error) {
        console.error("Failed to load project data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddOrEdit = async (entry: ProjectEntry) => {
    try {
      if (entry.id) {
        const updatedEntry = await updateProject(entry.id, entry);
        setEntries((prev) =>
          prev.map((e) => (e.id === entry.id ? updatedEntry : e))
        );
      } else {
        const newEntry = await createProject(entry);
        setEntries((prev) => [...prev, newEntry]);
      }
      setEditingIndex(null);
    } catch (err) {
      console.error("Error saving project entry:", err);
      toast.error("Something went wrong.");
    }
  };

  const handleEdit = (entry: ProjectEntry, index: number) => {
    setEditingIndex(index);
  };

  const handleDelete = async (index: number) => {
    const entry = entries[index];
    if (!entry?.id) return;

    try {
      await deleteProject(entry.id);
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
      <ProjectForm
        onAdd={handleAddOrEdit}
        initialData={editingIndex !== null ? entries[editingIndex] : undefined}
        isEditing={editingIndex !== null}
        onCancelEdit={() => setEditingIndex(null)}
      />
      <ProjectTable
        entries={entries}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
