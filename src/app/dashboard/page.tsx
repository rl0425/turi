"use client";

import { useState, useMemo } from "react";
import { TodoList } from "@/components/todo/TodoList";
import { TodoInput } from "@/components/todo/TodoInput";
import { useTodoStore } from "@/features/todo/stores/todoStore";
import { useUserSetup } from "@/features/user/hooks/useUserSetup";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RouteGuard } from "@/components/common/RouteGuard";
import { WeeklyProgress } from "@/components/todo/WeeklyProgress";
import { PencilIcon, CheckIcon } from "lucide-react";

const DASHBOARD_CONSTANTS = {
  TITLE: {
    HIGHLIGHT: "이번 주",
    NORMAL: " 할 일",
  },
  BUTTONS: {
    EDIT: {
      LABEL: "수정",
      ARIA_LABEL: "수정 모드 시작",
    },
    COMPLETE: {
      LABEL: "완료",
      ARIA_LABEL: "수정 모드 종료",
    },
    RESET: {
      LABEL: "개발용: 초기 설정으로 돌아가기",
    },
  },
  EMPTY_MESSAGE: "할 일이 없어요. 새로운 할 일을 추가해요.",
};

const DashboardPage = () => {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const { resetSetup } = useUserSetup(); // 개발용
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const editButtonProps = useMemo(
    () => ({
      icon: isEditMode ? (
        <CheckIcon className="w-5 h-5 mr-1" />
      ) : (
        <PencilIcon className="w-5 h-5 mr-1" />
      ),
      label: isEditMode
        ? DASHBOARD_CONSTANTS.BUTTONS.COMPLETE.LABEL
        : DASHBOARD_CONSTANTS.BUTTONS.EDIT.LABEL,
      ariaLabel: isEditMode
        ? DASHBOARD_CONSTANTS.BUTTONS.COMPLETE.ARIA_LABEL
        : DASHBOARD_CONSTANTS.BUTTONS.EDIT.ARIA_LABEL,
    }),
    [isEditMode]
  );

  const isTodoListEmpty = useMemo(() => todos.length === 0, [todos]);

  const pageAnimationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <RouteGuard requireSetup={true}>
      <motion.div
        {...pageAnimationProps}
        className="min-h-screen px-[5%] md:px-[20%] flex items-center justify-center flex-col bg-black text-white p-4"
      >
        <WeeklyProgress className="mb-1 w-full" />
        <div className="flex justify-end w-full">
          <Button
            onClick={toggleEditMode}
            variant="ghost"
            className="text-yellow-400"
            aria-label={editButtonProps.ariaLabel}
          >
            {editButtonProps.icon}
            {editButtonProps.label}
          </Button>
        </div>

        <div className="flex flex-col gap-5 w-full">
          {isEditMode && <TodoInput onSubmit={addTodo} />}

          {isTodoListEmpty ? (
            <p className="text-center text-gray-400 my-8">
              {DASHBOARD_CONSTANTS.EMPTY_MESSAGE}
            </p>
          ) : (
            <TodoList isEditMode={isEditMode} />
          )}

          {/* {!isEditMode && <WeeklyCalendar className="mt-8 w-full" />} */}
          {/* 개발용 테스트 버튼 */}
          <Button
            onClick={() => resetSetup()}
            className="mt-8 w-full md:w-auto ml-auto bg-red-500 hover:bg-red-600"
          >
            {DASHBOARD_CONSTANTS.BUTTONS.RESET.LABEL}
          </Button>
        </div>
      </motion.div>
    </RouteGuard>
  );
};

export default DashboardPage;
