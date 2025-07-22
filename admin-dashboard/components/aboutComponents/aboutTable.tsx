"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ImageOff } from "lucide-react";


import { AboutEntry } from "./aboutForm";
import { Card } from "../ui/card";
import Image from "next/image";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import { useState } from "react";
import AboutSearchBar from "./AboutSearchBar";
import AboutEmptyState from "./AboutEmptyState";
import { toast } from "sonner";
import AboutActionsDropdown from "./AboutActionsDropdown";

  
interface AboutTableProps {
  entries: AboutEntry[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onEdit: (entry: AboutEntry) => void;
  onDelete: (id: string) => void;
}

export default function AboutTable({
  entries,
  searchTerm,
  setSearchTerm,
  onEdit,
  onDelete,
}: AboutTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entryToDeleteId, setEntryToDeleteId] = useState<string | null>(null);



  return (
    <div className="mt-6">
      <Card className="py-0">
        <AboutSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-gray-800 py-6 ">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Heading</TableHead>
              <TableHead>Paragraph</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.length === 0 ? (
              <AboutEmptyState colSpan={4} />
            ) : (
              entries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {entry.imageUrl ? (
                      <div className="relative h-22 max-w-36 rounded overflow-hidden">
                        <Image
                          src={entry.imageUrl}
                          alt={entry.heading}
                          fill
                          className="object-cover rounded"
                          sizes="(max-width: 768px) 100vw, 32vw"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        <ImageOff className="text-gray-500 w-5 h-5" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{entry.heading}</TableCell>
                  <TableCell>{entry.paragraph}</TableCell>
                  <TableCell className="text-right">
                    <AboutActionsDropdown
                        entry={entry}
                        onEdit={() => onEdit(entry)}
                        onDelete={() => {
                          if (entry.id) {
                            setEntryToDeleteId(entry.id);
                            setDeleteDialogOpen(true);
                          } else {
                            toast.error("Invalid project: missing ID");
                          }
                        }}
                      />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setEntryToDeleteId(null);
        }}
        onConfirm={() => {
          if (entryToDeleteId !== null) {
            onDelete?.(entryToDeleteId);
            setDeleteDialogOpen(false);
            setEntryToDeleteId(null);
          }
        }}
      />
    </div>
  );
}
