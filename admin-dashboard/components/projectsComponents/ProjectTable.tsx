"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import { useState } from "react";
import { Card } from "../ui/card";
import { ProjectEntry } from "./ProjectForm";

interface ProjectTableProps {
  entries: ProjectEntry[];
  onEdit?: (entry: ProjectEntry, index: number) => void;
  onDelete?: (index: number) => void;
}

export default function ProjectTable({
  entries,
  onEdit,
  onDelete,
}: ProjectTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entryToDeleteIndex, setEntryToDeleteIndex] = useState<number | null>(
    null
  );

  return (
    <div className="mt-6">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Stack</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={entry.id}>
                <TableCell>
                  <div className="relative w-20 h-14 rounded overflow-hidden">
                    <Image
                      src={entry.imageUrls?.[0]}
                      alt={entry.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>{entry.title}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {entry.techStack.map((tech, idx) => (
                      <Badge key={idx}>{tech}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onEdit?.(entry, index)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setEntryToDeleteIndex(index);
                          setDeleteDialogOpen(true);
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
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
            onDelete?.(entryToDeleteIndex);
            setDeleteDialogOpen(false);
            setEntryToDeleteIndex(null);
          }
        }}
      />
    </div>
  );
}
