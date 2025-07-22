// hooks/useProjectManager.ts
"use client";

import { useEffect, useState, useMemo } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/pages/api/graphql";
import { ProjectEntry } from "@/components/projectsComponents/ProjectForm";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 2;

export function useProjectManager() {
  const [entries, setEntries] = useState<ProjectEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<ProjectEntry | undefined>(undefined);


  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [entries, searchTerm]);

  const totalPages = Math.ceil(filteredEntries.length / ITEMS_PER_PAGE);
  const paginatedEntries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEntries.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEntries, currentPage]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProjects();
        setEntries(data);
      } catch (error) {
        console.error("Failed to load project data", error);
        toast.error("Failed to load project data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAddOrEdit = async (entry: ProjectEntry) => {
    try {
      if (entry.id) {
        const updated = await updateProject(entry.id, entry);
        setEntries((prev) =>
          prev.map((e) => (e.id === entry.id ? updated : e))
        );
      } else {
        const created = await createProject(entry);
        setEntries((prev) => [...prev, created]);
      }
      setEditingEntry(undefined);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (entry: ProjectEntry) => {
  setEditingEntry(entry);
};


  const handleDelete = async (id: string) => {
  try {
    await deleteProject(id);
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    toast.success("Deleted successfully");
  } catch (err) {
    toast.error("Failed to delete.");
    console.error(err);
  }
};


  return {
    entries: paginatedEntries,
    allEntries: entries,
    editingEntry,
    isEditing: editingEntry !== null,
    isLoading,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    handleAddOrEdit,
    handleEdit,
    handleDelete,
    cancelEdit: () => setEditingEntry(undefined),
  };
}
