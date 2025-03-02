import { memo, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Todo } from "@/features/todo/types";
import { TODO_LIST_CONSTANTS } from "../constants";
import { cn } from "@/lib/utils";
import { TodoInput } from "../TodoInput";

interface TodoItemProps {
  todo: Todo;
  editingId: string | null;
  isEditMode: boolean;
  selectedDay: number;
  onEdit: (
    id: string,
    content: Partial<Omit<Todo, "id">>,
    days: number[]
  ) => void;
  onToggleEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, day: number) => void;
}

/**
 * 할일 항목 컴포넌트
 * @param {object} props
 * @param {Todo} props.todo
 * @param {string | null} props.editingId
 * @param {boolean} props.isEditMode
 * @param {number} props.selectedDay
 * @param {function} props.onEdit
 * @param {function} props.onToggleEdit
 * @param {function} props.onDelete
 * @param {function} props.onToggleComplete
 */
export const TodoItem = memo(
  ({
    todo,
    editingId,
    isEditMode,
    selectedDay,
    onEdit,
    onToggleEdit,
    onDelete,
    onToggleComplete,
  }: TodoItemProps) => {
    const isEditing = editingId === todo.id;

    const isCompletedForDay =
      todo.completedDays?.includes(selectedDay) || false;

    const contentClassName = cn(
      TODO_LIST_CONSTANTS.STYLES.ITEM_CONTENT,
      isCompletedForDay && TODO_LIST_CONSTANTS.STYLES.ITEM_COMPLETED
    );

    const handleEditSubmit = useCallback(
      (content: string, days: number[]) => {
        onEdit(todo.id, { title: content, days }, days);
        onToggleEdit("");
        return Promise.resolve();
      },
      [onEdit, onToggleEdit, todo.id]
    );

    const itemContent = useCallback(() => {
      if (isEditing) {
        return (
          <TodoInput
            content={todo.title}
            days={todo.days as (0 | 1 | 2 | 3 | 4 | 5 | 6)[]}
            onSubmit={handleEditSubmit}
            submitLabel="수정"
            className="w-full"
          />
        );
      }

      return (
        <>
          <div className={contentClassName}>{todo.title}</div>
          {isEditMode ? (
            <div className="flex items-center">
              <button
                onClick={() => onToggleEdit(todo.id)}
                className={TODO_LIST_CONSTANTS.STYLES.BUTTON_EDIT}
                aria-label={TODO_LIST_CONSTANTS.ARIA.EDIT}
              >
                <PencilIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className={TODO_LIST_CONSTANTS.STYLES.BUTTON_DELETE}
                aria-label={TODO_LIST_CONSTANTS.ARIA.DELETE}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Checkbox
              checked={isCompletedForDay}
              onCheckedChange={() => onToggleComplete(todo.id, selectedDay)}
              aria-label={`할일 ${isCompletedForDay ? "완료 취소" : "완료"}`}
              iconSize="5"
              className="ml-2 flex-shrink-0 w-6 h-6"
            />
          )}
        </>
      );
    }, [
      isEditing,
      isEditMode,
      todo,
      contentClassName,
      isCompletedForDay,
      selectedDay,
      handleEditSubmit,
      onToggleEdit,
      onDelete,
      onToggleComplete,
    ]);

    return (
      <div className={TODO_LIST_CONSTANTS.STYLES.ITEM_CONTAINER}>
        {itemContent()}
      </div>
    );
  }
);

TodoItem.displayName = "TodoItem";
