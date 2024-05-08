"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import Link from "next/link";
import DeleteRecommendationDialog from "./_components/delete-recommendation-dialog";
import { type StudentRecommendation } from "@/types/data/recommendation";

export const columns: ColumnDef<StudentRecommendation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Pilih semua"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Pilih hasil rekomendasi"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Siswa
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nisn",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NISN
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "consistency_ratio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rasio Konsistensi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const badgeColor =
        row.original.consistency_ratio > 0.1
          ? "text-red-500"
          : "text-green-500";
      return (
        <div className="text-center">
          <p className={`text-sm font-semibold ${badgeColor}`}>
            {row.original.consistency_ratio.toFixed(3)}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "ahp_results",
    header: "Rekomendasi AHP",
    cell: ({ row }) => {
      const ahp_result = row.original.ahp_results;
      return (
        <ol className="list-inside list-decimal">
          {ahp_result.slice(0, 3).map((item, index) => (
            <li key={index}>{item.alternative}</li>
          ))}
        </ol>
      );
    },
  },
  {
    accessorKey: "topsis_results",
    header: "Rekomendasi TOPSIS",
    cell: ({ row }) => {
      const topsis_result = row.original.topsis_results;
      return (
        <ol className="list-inside list-decimal">
          {topsis_result
            ?.slice(0, 3)
            .map((item, index) => <li key={index}>{item.alternative}</li>)}
        </ol>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const recommendation = row.original;
      const detailUrl =
        "/admin/dashboard/hasil-rekomendasi/" + recommendation.student_id;

      return (
        <div className="flex items-center gap-2">
          <Button asChild size="icon">
            <Link href={detailUrl}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <DeleteRecommendationDialog recommendation={recommendation} />
        </div>
      );
    },
  },
];
