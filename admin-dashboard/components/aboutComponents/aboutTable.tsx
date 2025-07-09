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
import { MoreHorizontal, Pencil, Trash2, ImageOff } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { AboutEntry } from "./aboutForm";
import { Card } from "../ui/card";

interface AboutTableProps {
  entries: AboutEntry[];
  onEdit?: (entry: AboutEntry, index: number) => void;
  onDelete?: (index: number) => void;
}

export default function AboutTable({
  entries,
  onEdit,
  onDelete,
}: AboutTableProps) {
  return (
    <div className="mt-6">
      <Card className="py-0">
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
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  No entries found. Add your first one!
                </TableCell>
              </TableRow>
            ) : (
              entries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {entry.imageUrl ? (
                      <img
                        src={entry.imageUrl}
                        alt={entry.heading}
                        width={48}
                        height={48}
                        className="h-28 w-32 rounded object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        <ImageOff className="text-gray-500 w-5 h-5" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{entry.heading}</TableCell>
                  <TableCell>{entry.paragraph}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => onEdit?.(entry, index)}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDelete?.(index)}
                          className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
