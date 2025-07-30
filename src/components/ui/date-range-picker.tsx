"use client";

import type { DateRange as ReactDayPickerDateRange } from "react-day-picker";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DateRangePickerProps = {
  className?: string;
  date?: ReactDayPickerDateRange;
  onDateChange?: (date: ReactDayPickerDateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function DateRangePicker({
  className,
  date,
  onDateChange,
  placeholder = "Pick a date range",
  disabled = false,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const formatDateRange = (dateRange: ReactDayPickerDateRange | undefined) => {
    if (!dateRange?.from) {
      return placeholder;
    }

    if (dateRange.from && !dateRange.to) {
      return format(dateRange.from, "LLL dd, y");
    }

    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`;
    }

    return placeholder;
  };

  const handleDateSelect = (selectedDate: ReactDayPickerDateRange | undefined) => {
    onDateChange?.(selectedDate);

    // Close popover when both dates are selected
    if (selectedDate?.from && selectedDate?.to) {
      setIsOpen(false);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            size="sm"
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange(date)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
