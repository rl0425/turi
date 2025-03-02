import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTodoStore } from "@/features/todo/stores/todoStore";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CalendarDaysIcon } from "lucide-react";
import { DaySelector } from "../DaySelector";
import { TodoItem } from "../TodoItem";
import { TODO_LIST_CONSTANTS } from "../constants";
import { Todo } from "@/features/todo/types";
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

  const [selectedDay, setSelectedDay] = useState<number>(() => {
    const today = new Date();
    return (today.getDay() + 6) % 7;
  });

  const isToday = useMemo(() => {
    const today = new Date();
    return selectedDay === (today.getDay() + 6) % 7;
  }, [selectedDay]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (!todo.days || todo.days.length === 0) return true;

      return todo.days.includes(selectedDay);
    });
  }, [todos, selectedDay]);

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

  const handleSelectDay = useCallback((day: number) => {
    setSelectedDay(day);
  }, []);

  const handleReturnToday = useCallback(() => {
    const today = new Date();
    setSelectedDay((today.getDay() + 6) % 7);
  }, []);

  const handleEdit = useCallback(
    async (id: string, content: Partial<Omit<Todo, "id">>, days: number[]) => {
      await updateTodo(
        id,
        { title: content.title, days: content.days },
        content.completedDays
      );
      toggleEdit(null);
    },
    [updateTodo, toggleEdit]
  );

  const handleToggleEdit = useCallback(
    (id: string) => {
      toggleEdit(id);
    },
    [toggleEdit]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteTodo(id);
    },
    [deleteTodo]
  );

  const handleToggleComplete = useCallback(
    (id: string, day: number) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        const completedDays = todo.completedDays;
        const isCompleted = completedDays.includes(day);
        const newCompletedDays = isCompleted
          ? completedDays.filter((d) => d !== day)
          : [...completedDays, day];
        updateTodo(id, { completedDays: newCompletedDays });
      }
    },
    [todos, updateTodo]
  );

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

  if (filteredTodos.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className={TODO_LIST_CONSTANTS.STYLES.EMPTY_CONTAINER}>
          <p>{TODO_LIST_CONSTANTS.MESSAGES.EMPTY.MAIN}</p>
        </div>
        <div className="flex justify-end items-end flex-row">
          {!isToday && (
            <Button
              variant="ghost"
              onClick={handleReturnToday}
              className={TODO_LIST_CONSTANTS.STYLES.TODAY_BUTTON}
              aria-label={TODO_LIST_CONSTANTS.ARIA.RETURN_TODAY}
            >
              <CalendarDaysIcon className="w-4 h-4" />
              <span>{TODO_LIST_CONSTANTS.MESSAGES.RETURN_TODAY}</span>
            </Button>
          )}
          <DaySelector
            selectedDay={selectedDay}
            onSelectDay={handleSelectDay}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
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
                selectedDay={selectedDay}
                onEdit={handleEdit}
                onToggleEdit={handleToggleEdit}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        </div>
      </div>
      {!isEditMode && (
        <div className="flex justify-end items-end flex-row">
          {!isToday && (
            <Button
              variant="ghost"
              onClick={handleReturnToday}
              className={TODO_LIST_CONSTANTS.STYLES.TODAY_BUTTON}
              aria-label={TODO_LIST_CONSTANTS.ARIA.RETURN_TODAY}
            >
              <CalendarDaysIcon className="w-4 h-4" />
              <span>{TODO_LIST_CONSTANTS.MESSAGES.RETURN_TODAY}</span>
            </Button>
          )}
          <DaySelector
            selectedDay={selectedDay}
            onSelectDay={handleSelectDay}
          />
        </div>
      )}
    </div>
  );
};
