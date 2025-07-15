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
import { Github, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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
      <Card className="py-0">
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-gray-800 py-6">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Stack</TableHead>
              <TableHead>Discription</TableHead>
              <TableHead>Github Url</TableHead>
              <TableHead>Live Url</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, index) => (
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
                <TableCell className="max-w-[300px] sm:max-w-[300px] truncate">
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
                  <div className="flex items-center align-middle">
                    <div>
                      <Github />
                    </div>
                    <div>
                      <a
                        href={entry.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center align-middle space-x-2">
                    <div>
                      <span className="relative flex size-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75"></span>
                        <span className="relative inline-flex size-3 rounded-full bg-red-600"></span>
                      </span>
                    </div>
                    <div>
                      <a
                        href={entry.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 underline"
                      >
                        {/* <BounceLoader size={16} color="#10b981" /> */}
                        {/* emerald-500 */}
                        Live
                      </a>
                    </div>
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
