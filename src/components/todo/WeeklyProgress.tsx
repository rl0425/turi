import { useMemo } from "react";
import { useTodoStore } from "@/features/todo/stores/todoStore";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WeeklyProgressProps {
  className?: string;
}

/**
 * 주간 진행률 관련 상수
 */
const WEEKLY_PROGRESS_CONSTANTS = {
  TITLE: "주간 진행률",
  DAYS: ["월", "화", "수", "목", "금", "토", "일"],
  MOCK_DATA: [
    { completed: 5, total: 7 },
    { completed: 3, total: 6 },
    { completed: 7, total: 7 },
    { completed: 2, total: 5 },
    { completed: 4, total: 8 },
    { completed: 1, total: 3 },
    { completed: 0, total: 2 },
  ],
  STYLES: {
    CONTAINER: "pr-4",
    CHART_CONTAINER: "flex items-end justify-between h-32 gap-1",
    TOTAL_BAR: "w-full bg-gray-700 rounded-t-sm absolute bottom-0",
    COMPLETED_BAR: "w-full bg-yellow-400 rounded-t-sm absolute bottom-0",
    DAY_LABEL: "text-xs text-gray-400 mt-2",
    PROGRESS_CONTAINER:
      "w-full h-4 rounded-full rounded-tl-none rounded-bl-none mt-4 overflow-hidden",
    PROGRESS_BAR:
      "h-full bg-yellow-400 rounded-full rounded-tl-none rounded-bl-none",
  },
  MIN_PROGRESS_PERCENT: 3,
  ANIMATION: {
    DURATION: 0.8,
    EASE: [0.32, 0.72, 0, 1],
  },
  PROGRESS_MESSAGES: {
    VERY_LOW: [
      // 0-20%
      "시작이 반이에요! 화이팅!",
      "조금씩 시작해볼까요?",
      "작은 시작도 큰 성취의 첫걸음이에요!",
      "천리길도 한 걸음부터!",
      "오늘 하나의 미션을 완료해봐요!",
      "할 수 있어요! 믿어요!",
    ],
    LOW: [
      // 21-40%
      "꾸준히 나아가고 있어요!",
      "좋아요! 계속 해봐요!",
      "더 해낼 수 있어요!",
      "진행 중인 일에 집중해봐요!",
      "지금 페이스 좋아요!",
      "조금씩 목표에 다가가고 있어요!",
    ],
    MEDIUM: [
      // 41-60%
      "절반 이상 왔어요! 대단해요!",
      "중간 지점을 넘었어요!",
      "꾸준함이 빛나는 순간이에요!",
      "이 페이스라면 충분히 해낼 거예요!",
      "목표를 향해 착실히 나아가고 있어요!",
      "멋진 진행 상황이네요!",
    ],
    HIGH: [
      // 61-80%
      "거의 다 왔어요! 조금만 더!",
      "목표 달성이 눈앞이에요!",
      "대단해요! 끝까지 힘내세요!",
      "좋은 진행률이에요! 계속 가요!",
      "놀라운 성과에요! 계속 가요!",
      "조금만 더 집중하면 끝나요!",
    ],
    VERY_HIGH: [
      // 81-99%
      "거의 다 완료했어요! 대단해요!",
      "목표 달성이 코앞이에요!",
      "마지막 스퍼트! 화이팅!",
      "마무리만 남았어요!",
      "놀라운 집중력이네요!",
      "오늘 일을 거의 끝내셨군요! 멋져요!",
    ],
    COMPLETE: [
      // 100%
      "모든 작업을 완료했어요! 대단해요!",
      "완벽해요! 목표 달성 성공!",
      "놀라운 성취에요! 축하합니다!",
      "할 일을 모두 마쳤어요! 휴식을 취하세요!",
      "멋진 한 주였어요! 보람찬 시간 보내셨네요!",
      "목표 달성 완료! 자신을 칭찬해주세요!",
    ],
  },
};

/**
 * 주간 진행률 컴포넌트
 * @param {object} props
 * @param {string} props.className
 */
export const WeeklyProgress = ({ className }: WeeklyProgressProps) => {
  const todos = useTodoStore((state) => state.todos);

  const completionRatio = useMemo(() => {
    // 모든 투두 항목의 전체 일수 계산 (각 투두 항목이 해당하는 요일 수)
    let totalDaysCount = 0;
    // 모든 투두 항목의 완료된 일수 계산
    let completedDaysCount = 0;

    todos.forEach((todo) => {
      // days 배열이 있는 경우만 계산에 포함
      if (todo.days && todo.days.length > 0) {
        // 투두 항목이 적용되는 총 요일 수
        totalDaysCount += todo.days.length;

        // completedDays 배열이 있는 경우 완료된 요일 수 계산
        if (todo.completedDays && todo.completedDays.length > 0) {
          // todo.days에 포함된 날짜 중 completedDays에도 있는 날짜만 계산
          const completedDaysInSchedule = todo.completedDays.filter((day) =>
            todo.days.includes(day)
          ).length;

          completedDaysCount += completedDaysInSchedule;
        }
      }
    });

    return totalDaysCount > 0
      ? Math.round((completedDaysCount / totalDaysCount) * 100)
      : 0;
  }, [todos]);

  const displayProgress = useMemo(() => {
    return completionRatio === 0
      ? WEEKLY_PROGRESS_CONSTANTS.MIN_PROGRESS_PERCENT
      : completionRatio;
  }, [completionRatio]);

  const getMessageCategory = useMemo(() => {
    if (completionRatio === 100) return "COMPLETE";
    if (completionRatio >= 81) return "VERY_HIGH";
    if (completionRatio >= 61) return "HIGH";
    if (completionRatio >= 41) return "MEDIUM";
    if (completionRatio >= 21) return "LOW";
    return "VERY_LOW";
  }, [completionRatio]);

  const randomMessage = useMemo(() => {
    const messages =
      WEEKLY_PROGRESS_CONSTANTS.PROGRESS_MESSAGES[getMessageCategory];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }, [getMessageCategory]);

  return (
    <div className={cn(WEEKLY_PROGRESS_CONSTANTS.STYLES.CONTAINER, className)}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">{randomMessage}</h2>
        <span className="text-yellow-400 font-bold">{completionRatio}%</span>
      </div>

      <div
        className={WEEKLY_PROGRESS_CONSTANTS.STYLES.PROGRESS_CONTAINER}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={completionRatio}
        role="progressbar"
      >
        <motion.div
          className={WEEKLY_PROGRESS_CONSTANTS.STYLES.PROGRESS_BAR}
          initial={{ width: "0%" }}
          animate={{ width: `${displayProgress}%` }}
          transition={{
            duration: WEEKLY_PROGRESS_CONSTANTS.ANIMATION.DURATION,
            ease: WEEKLY_PROGRESS_CONSTANTS.ANIMATION.EASE,
          }}
          style={{
            opacity: completionRatio === 0 ? 0.3 : 1,
          }}
        />
      </div>
    </div>
  );
};
