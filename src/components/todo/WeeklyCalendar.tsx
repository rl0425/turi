import { useMemo } from "react";
import { cn } from "@/lib/utils";
// import { useTodoStore } from "@/features/todo/stores/todoStore";

interface WeeklyCalendarProps {
  className?: string;
}

/**
 * 주간 캘린더 관련 상수
 */
const WEEKLY_CALENDAR_CONSTANTS = {
  DAYS: ["월", "화", "수", "목", "금", "토", "일"],
  STYLES: {
    DAY_CONTAINER: "flex flex-col items-center",
    DAY_LABEL: "text-md font-bold mb-2",
    DAY_BOX_BASE: "w-6 h-6 border rounded-md flex items-center",
    DAY_BOX_COMPLETED: "bg-yellow-400 border-yellow-400",
    DAY_BOX_UNCOMPLETED: "border-yellow-400 border-2",
    DAY_BOX_INACTIVE: "border-yellow-400 border-2",
  },
  ARIA_LABELS: {
    COMPLETED: "완료",
    UNCOMPLETED: "미완료",
  },
};

/**
 * 주간 캘린더 컴포넌트
 * @param {object} props
 * @param {string} props.className
 */
export const WeeklyCalendar = ({ className }: WeeklyCalendarProps) => {
  //   const todos = useTodoStore((state) => state.todos);

  // Mock 요일별 데이터
  const days = useMemo(
    () => [
      {
        key: 0,
        label: WEEKLY_CALENDAR_CONSTANTS.DAYS[0],
        hasTasks: true,
        completed: true,
      },
      {
        key: 1,
        label: WEEKLY_CALENDAR_CONSTANTS.DAYS[1],
        hasTasks: true,
        completed: false,
      },
      {
        key: 2,
        label: WEEKLY_CALENDAR_CONSTANTS.DAYS[2],
        hasTasks: true,
        completed: true,
      },
      {
        key: 3,
        label: WEEKLY_CALENDAR_CONSTANTS.DAYS[3],
        hasTasks: true,
        completed: false,
      },
      {
        key: 4,
        label: WEEKLY_CALENDAR_CONSTANTS.DAYS[4],
        hasTasks: true,
        completed: false,
      },
      {
        key: 5,
        label: WEEKLY_CALENDAR_CONSTANTS.DAYS[5],
        hasTasks: false,
        completed: false,
      },
      {
        key: 6,
        label: WEEKLY_CALENDAR_CONSTANTS.DAYS[6],
        hasTasks: false,
        completed: false,
      },
    ],
    []
  );

  return (
    <div className={cn("flex flex-col items-flex-end", className)}>
      <div className="flex justify-end gap-2">
        {days.map((day) => {
          const dayBoxClassName = cn(
            WEEKLY_CALENDAR_CONSTANTS.STYLES.DAY_BOX_BASE,
            day.completed
              ? WEEKLY_CALENDAR_CONSTANTS.STYLES.DAY_BOX_COMPLETED
              : WEEKLY_CALENDAR_CONSTANTS.STYLES.DAY_BOX_UNCOMPLETED,
            !day.hasTasks && WEEKLY_CALENDAR_CONSTANTS.STYLES.DAY_BOX_INACTIVE
          );

          const ariaLabel = `${day.label}요일: ${
            day.completed
              ? WEEKLY_CALENDAR_CONSTANTS.ARIA_LABELS.COMPLETED
              : WEEKLY_CALENDAR_CONSTANTS.ARIA_LABELS.UNCOMPLETED
          }`;

          return (
            <div
              key={day.key}
              className={WEEKLY_CALENDAR_CONSTANTS.STYLES.DAY_CONTAINER}
            >
              <div className={WEEKLY_CALENDAR_CONSTANTS.STYLES.DAY_LABEL}>
                {day.label}
              </div>
              <div className={dayBoxClassName} aria-label={ariaLabel} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
