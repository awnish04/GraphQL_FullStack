"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectEntry } from "./ProjectForm";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import ProjectEmptyState from "./ProjectEmptyState";
import ProjectActionsDropdown from "./ProjectActionsDropdown";
import { useState } from "react";
import ProjectSearchBar from "./ProjectSearchBar";


interface ProjectTableProps {
  entries: ProjectEntry[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onEdit: (entry: ProjectEntry, index: number) => void;
  onDelete: (index: number) => void;
}

export default function ProjectTable({
  entries,
  searchTerm,
  setSearchTerm,
  onEdit,
  onDelete,
}: ProjectTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entryToDeleteIndex, setEntryToDeleteIndex] = useState<number | null>(
    null
  );

  

  return (
    <div className="mt-6 space-y-4">
      <Card className="py-0">
        <ProjectSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-gray-800 py-6">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Stack</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Github</TableHead>
              <TableHead>Live</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.length === 0 ? (
              <ProjectEmptyState colSpan={7} />
            ) : (
              entries.map((entry, index) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div className="relative w-40 h-24 rounded overflow-hidden">
                      <Image
                        src={entry.imageUrls?.[0] || "/placeholder.png"}
                        alt={entry.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{entry.title}</TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    <div className="flex flex-wrap gap-1 justify-between">
                      {entry.techStack.map((tech, idx) => (
                        <Badge variant="outline" key={idx}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>
                    <a
                      href={entry.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline flex items-center gap-1"
                    >
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="relative flex size-3">
                        <span className="absolute h-full w-full animate-ping rounded-full bg-red-600 opacity-75" />
                        <span className="relative inline-flex size-3 rounded-full bg-red-600" />
                      </span>
                      <a
                        href={entry.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 underline"
                      >
                        Live
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <ProjectActionsDropdown
                      entry={entry}
                      onEdit={() => onEdit(entry, index)}
                      onDelete={() => {
                        setEntryToDeleteIndex(index);
                        setDeleteDialogOpen(true);
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
          setEntryToDeleteIndex(null);
        }}
        onConfirm={() => {
          if (entryToDeleteIndex !== null) {
            onDelete(entryToDeleteIndex);
            setDeleteDialogOpen(false);
            setEntryToDeleteIndex(null);
          }
        }}
      />
    </div>
  );
}
