// hooks/useAboutManager.ts
"use client";

import { useEffect, useState } from "react";
import {
  createAbout,
  deleteAbout,
  getAbout,
  updateAbout,
} from "@/pages/api/graphql";
import { toast } from "sonner";
import { AboutEntry } from "@/components/aboutComponents/aboutForm";

export function useAboutManager(itemsPerPage = 3) {
  const [entries, setEntries] = useState<AboutEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const filteredEntries = entries.filter(
    (entry) =>
      entry.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.paragraph.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);

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
        const updated = await updateAbout(entry.id, entry);
        setEntries((prev) =>
          prev.map((e) => (e.id === entry.id ? updated : e))
        );
      } else {
        const created = await createAbout(entry);
        setEntries((prev) => [...prev, created]);
      }
      cancelEdit();
    } catch (err) {
      console.error("Error saving entry:", err);
      toast.error("Something went wrong.");
    }
  };


  const handleEdit = (entry: AboutEntry) => {
  const index = entries.findIndex((e) => e.id === entry.id);
  if (index !== -1) {
    setEditingIndex(index);
  }
};


  const handleDelete = async (id: string): Promise<void> => {
  try {
    await deleteAbout(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
    toast.success("Deleted successfully");

    setCurrentPage((prevPage) => {
      const maxPage = Math.ceil((entries.length - 1) / itemsPerPage);
      return prevPage > maxPage ? maxPage : prevPage;
    });

    cancelEdit();
  } catch (err) {
    toast.error("Failed to delete.");
    console.error(err);
  }
};


  const cancelEdit = () => setEditingIndex(null);

  return {
    entries: paginatedEntries,
    allEntries: entries,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    isLoading,
    isEditing: editingIndex !== null,
    editingData: editingIndex !== null ? entries[editingIndex] : undefined,
    handleAddOrEdit,
    handleEdit,
    handleDelete,
    cancelEdit,
  };
}
