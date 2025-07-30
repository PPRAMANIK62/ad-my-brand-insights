import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

type SortableHeaderProps = {
  column: any;
  children: React.ReactNode;
};

export function SortableHeader({ column, children }: SortableHeaderProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="h-auto p-0 hover:bg-transparent"
    >
      {children}
      {column.getIsSorted() === "asc"
        ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          )
        : column.getIsSorted() === "desc"
          ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            )
          : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
    </Button>
  );
}
