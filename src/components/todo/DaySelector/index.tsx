import { memo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DAY_SELECTOR_CONSTANTS = {
  DAYS: [
    { key: 0, label: "월" },
    { key: 1, label: "화" },
    { key: 2, label: "수" },
    { key: 3, label: "목" },
    { key: 4, label: "금" },
    { key: 5, label: "토" },
    { key: 6, label: "일" },
  ],
  STYLES: {
    DAY_BUTTON: "w-10 h-10 rounded-full flex items-center justify-center",
    DAY_BUTTON_ACTIVE: "bg-yellow-400 text-black",
    DAY_BUTTON_INACTIVE: "bg-neutral-800 text-white hover:bg-neutral-700",
  },
  ARIA: {
    SELECT_DAY: "요일 선택",
  },
};

interface DaySelectorProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

// 요일 선택 컴포넌트
const DaySelector = memo(({ selectedDay, onSelectDay }: DaySelectorProps) => {
  return (
    <div className="flex justify-between gap-2 mt-4">
      {DAY_SELECTOR_CONSTANTS.DAYS.map((day) => (
        <Button
          key={day.key}
          onClick={() => onSelectDay(day.key)}
          className={cn(
            DAY_SELECTOR_CONSTANTS.STYLES.DAY_BUTTON,
            selectedDay === day.key
              ? DAY_SELECTOR_CONSTANTS.STYLES.DAY_BUTTON_ACTIVE
              : DAY_SELECTOR_CONSTANTS.STYLES.DAY_BUTTON_INACTIVE
          )}
          aria-label={`${day.label}요일 ${DAY_SELECTOR_CONSTANTS.ARIA.SELECT_DAY}`}
          aria-pressed={selectedDay === day.key}
        >
          {day.label}
        </Button>
      ))}
    </div>
  );
});

DaySelector.displayName = "DaySelector";

export { DaySelector };
