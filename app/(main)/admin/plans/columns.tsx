'use client'
import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: number;
  name: string;
  priceCurrency: string;
  price: number;
  status: "Active" | "Ban";
  profitPercent: number;
  maxReturnPercent: number;
  durationDays:number
  createdAt: string
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "#",
    maxSize: 5,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "priceCurrency",
    header: "Currency"
  },
  {
    accessorKey: "profitPercent",
    header: "Daily ROI"
  },
  {
    accessorKey: "maxReturnPercent",
    header: "Max Return"
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "durationDays",
    header: "Duration"
  },
];