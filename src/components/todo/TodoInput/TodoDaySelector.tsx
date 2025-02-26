import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import type { TodoDay, TodoDaySelectorProps } from "@/features/todo/types";

const DAYS: TodoDay[] = [
  { key: 0, label: "월" },
  { key: 1, label: "화" },
  { key: 2, label: "수" },
  { key: 3, label: "목" },
  { key: 4, label: "금" },
  { key: 5, label: "토" },
  { key: 6, label: "일" },
];

export const TodoDaySelector = ({
  selectedDays,
  onChange,
  className,
}: TodoDaySelectorProps) => {
  const handleDayClick = (day: TodoDay["key"]) => {
    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    onChange(newSelectedDays);
  };

  const getDayButtonClass = useMemo(
    () => (day: TodoDay["key"]) =>
      cn(
        "w-8 h-8 rounded-[10px] text-[16px] font-bold",
        selectedDays.includes(day)
          ? "bg-yellow-400 text-black border border-black"
          : "bg-transparent text-black dark:text-white/50 border border-white/50 dark:border-white/50"
      ),
    [selectedDays]
  );

  return (
    <div className={cn("flex gap-1.5", className)}>
      {DAYS.map((day) => (
        <Button
          key={day.key}
          type="button"
          variant="ghost"
          className={getDayButtonClass(day.key)}
          onClick={() => handleDayClick(day.key)}
          aria-label={`${day.label}요일 선택`}
        >
          {day.label}
        </Button>
      ))}
    </div>
  );
};
