"use client";

import { useEffect, useState, useMemo } from "react";

import { toast } from "sonner";
import { AboutEntry } from "@/components/aboutComponents/aboutForm";
import {
  createAbout,
  deleteAbout,
  getAbout,
  updateAbout,
} from "@/app/api/graphql/route";

export function useAboutManager(itemsPerPage = 3) {
  const [entries, setEntries] = useState<AboutEntry[]>([]);
  const [editingData, setEditingData] = useState<AboutEntry | undefined>(
    undefined
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // filter by heading or paragraph
  const filtered = useMemo(
    () =>
      entries.filter(
        (e) =>
          e.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.paragraph.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [entries, searchTerm]
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = useMemo(
    () =>
      filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filtered, currentPage, itemsPerPage]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAbout();
        setEntries(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load About entries.");
      } finally {
        setIsLoading(false);
      }
    }
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
      setEditingData(undefined);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save entry.");
    }
  };

  const handleEdit = (entry: AboutEntry) => {
    setEditingData(entry);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAbout(id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
      toast.success("Deleted successfully");
      setCurrentPage((p) =>
        Math.min(p, Math.ceil((entries.length - 1) / itemsPerPage))
      );
      setEditingData(undefined);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete entry.");
    }
  };

  const cancelEdit = () => setEditingData(undefined);

  return {
    entries: paginated,
    allEntries: entries,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    setCurrentPage,
    isLoading,
    isEditing: Boolean(editingData),
    editingData,
    handleAddOrEdit,
    handleEdit,
    handleDelete,
    cancelEdit,
  };
}
