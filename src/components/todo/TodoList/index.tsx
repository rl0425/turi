import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTodoStore } from "@/features/todo/stores/todoStore";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CalendarDaysIcon } from "lucide-react";
import { DaySelector } from "../DaySelector";
import { TodoItem } from "../TodoItem";
import { TODO_LIST_CONSTANTS } from "../constants";

interface TodoListProps {
  isEditMode: boolean;
}

/**
 * 할일 목록 컴포넌트
 * @param {object} props
 * @param {boolean} props.isEditMode
 */
export const TodoList = ({ isEditMode }: TodoListProps) => {
  const { todos, editingId, updateTodo, deleteTodo, toggleEdit, saveTodos } =
    useTodoStore();
  const { toast } = useToast();
  const listRef = useRef<HTMLDivElement>(null);
  const prevTodosLength = useRef(todos.length);

  // 현재 날짜 관련 상태
  const [selectedDay, setSelectedDay] = useState<number>(() => {
    const today = new Date();
    return (today.getDay() + 6) % 7; // 0:월요일, 1:화요일, ..., 6:일요일로 변환
  });

  // 오늘 날짜인지 확인
  const isToday = useMemo(() => {
    const today = new Date();
    return selectedDay === (today.getDay() + 6) % 7;
  }, [selectedDay]);

  // 선택된 날짜에 맞는 할일 필터링
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      // 모든 요일에 표시되어야 하는 경우
      if (!todo.days || todo.days.length === 0) return true;

      // 선택된 요일에 해당하는 할일만 표시
      return todo.days.includes(selectedDay);
    });
  }, [todos, selectedDay]);

  // 할일 목록이 변경되었을 때 스크롤을 부드럽게 가장 아래로 이동
  useEffect(() => {
    if (todos.length > prevTodosLength.current && listRef.current) {
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTo({
            top: listRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }

    prevTodosLength.current = todos.length;
  }, [todos.length]);

  // 요일 선택 핸들러
  const handleSelectDay = useCallback((day: number) => {
    setSelectedDay(day);
  }, []);

  // 오늘로 돌아가기 핸들러
  const handleReturnToday = useCallback(() => {
    const today = new Date();
    setSelectedDay((today.getDay() + 6) % 7);
  }, []);

  // 할일 편집 핸들러
  const handleEdit = useCallback(
    async (id: string, content: string, days: number[]) => {
      await updateTodo(id, content, days);
      toggleEdit(null);
    },
    [updateTodo, toggleEdit]
  );

  // 편집 모드 토글 핸들러
  const handleToggleEdit = useCallback(
    (id: string) => {
      toggleEdit(id);
    },
    [toggleEdit]
  );

  // 할일 삭제 핸들러
  const handleDelete = useCallback(
    (id: string) => {
      deleteTodo(id);
    },
    [deleteTodo]
  );

  // 할일 완료 상태 토글 핸들러
  const handleToggleComplete = useCallback(
    (id: string) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        updateTodo(id, todo.content, todo.days, !todo.isCompleted);
      }
    },
    [todos, updateTodo]
  );

  // 할일 저장 핸들러
  const handleSave = useCallback(async () => {
    try {
      await saveTodos();
      toast({
        title: TODO_LIST_CONSTANTS.MESSAGES.TOAST.SAVE_SUCCESS,
        variant: "default",
      });
    } catch (error) {
      console.error("Todo 저장 실패:", error);
      toast({
        title: TODO_LIST_CONSTANTS.MESSAGES.TOAST.SAVE_ERROR,
        description: TODO_LIST_CONSTANTS.MESSAGES.TOAST.SAVE_ERROR_DETAIL,
        variant: "destructive",
      });
    }
  }, [saveTodos, toast]);

  // 할일이 없을 때 표시할 내용
  if (filteredTodos.length === 0) {
    return (
      <div className="flex flex-col h-full">
        {/* "오늘로 돌아가기" 버튼 - 오늘이 아닌 날짜를 볼 때만 표시 */}
        {!isToday && (
          <Button
            variant="ghost"
            onClick={handleReturnToday}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 self-start mb-2"
            aria-label={TODO_LIST_CONSTANTS.ARIA.RETURN_TODAY}
          >
            <CalendarDaysIcon className="w-4 h-4" />
            <span>{TODO_LIST_CONSTANTS.MESSAGES.RETURN_TODAY}</span>
          </Button>
        )}

        <div className={TODO_LIST_CONSTANTS.STYLES.EMPTY_CONTAINER}>
          <p>{TODO_LIST_CONSTANTS.MESSAGES.EMPTY.MAIN}</p>
          <p className="mt-2 text-sm">
            {TODO_LIST_CONSTANTS.MESSAGES.EMPTY.SUB}
          </p>
        </div>

        {/* 요일 선택기 */}
        <DaySelector selectedDay={selectedDay} onSelectDay={handleSelectDay} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* "오늘로 돌아가기" 버튼 - 오늘이 아닌 날짜를 볼 때만 표시 */}
      {!isToday && (
        <Button
          variant="ghost"
          onClick={handleReturnToday}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 self-start mb-2"
          aria-label={TODO_LIST_CONSTANTS.ARIA.RETURN_TODAY}
        >
          <CalendarDaysIcon className="w-4 h-4" />
          <span>{TODO_LIST_CONSTANTS.MESSAGES.RETURN_TODAY}</span>
        </Button>
      )}

      <div
        className={TODO_LIST_CONSTANTS.STYLES.LIST_CONTAINER}
        aria-label={TODO_LIST_CONSTANTS.ARIA.LIST}
        role="list"
      >
        <div
          className={`${TODO_LIST_CONSTANTS.STYLES.LIST_CONTENT} scroll-smooth`}
          ref={listRef}
        >
          <div className={TODO_LIST_CONSTANTS.STYLES.ITEMS_CONTAINER}>
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                editingId={editingId}
                isEditMode={isEditMode}
                onEdit={handleEdit}
                onToggleEdit={handleToggleEdit}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        </div>

        {isEditMode && (
          <Button
            onClick={handleSave}
            className="mt-4 md:w-auto ml-auto"
            aria-label={TODO_LIST_CONSTANTS.ARIA.SAVE_ALL}
          >
            {TODO_LIST_CONSTANTS.BUTTONS.SAVE_ALL}
          </Button>
        )}
      </div>

      {/* 요일 선택기 */}
      <DaySelector selectedDay={selectedDay} onSelectDay={handleSelectDay} />
    </div>
  );
};
