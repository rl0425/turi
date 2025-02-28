import { memo, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Todo } from "@/features/todo/types";
import { TODO_LIST_CONSTANTS } from "../constants";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
  editingId: string | null;
  isEditMode: boolean;
  onEdit: (id: string, content: string, days: number[]) => void;
  onToggleEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

/**
 * 할일 항목 컴포넌트
 * @param {object} props
 * @param {Todo} props.todo 할일 객체
 * @param {string | null} props.editingId 현재 편집 중인 할일 ID
 * @param {boolean} props.isEditMode 편집 모드 여부
 * @param {function} props.onEdit 할일 편집 핸들러
 * @param {function} props.onToggleEdit 편집 모드 토글 핸들러
 * @param {function} props.onDelete 할일 삭제 핸들러
 * @param {function} props.onToggleComplete 할일 완료 상태 토글 핸들러
 */
export const TodoItem = memo(
  ({
    todo,
    editingId,
    isEditMode,
    onEdit,
    onToggleEdit,
    onDelete,
    onToggleComplete,
  }: TodoItemProps) => {
    const isEditing = editingId === todo.id;

    const contentClassName = cn(
      TODO_LIST_CONSTANTS.STYLES.ITEM_CONTENT,
      todo.isCompleted && TODO_LIST_CONSTANTS.STYLES.ITEM_COMPLETED
    );

    const handleContentEdit = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onEdit(todo.id, e.target.value, todo.days);
      },
      [onEdit, todo.id, todo.days]
    );

    const itemContent = useCallback(() => {
      if (isEditing) {
        return (
          <Input
            value={todo.content}
            onChange={handleContentEdit}
            autoFocus
            className="flex-1"
          />
        );
      }

      return (
        <>
          <div className={contentClassName}>{todo.content}</div>
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
              checked={todo.isCompleted}
              onCheckedChange={() => onToggleComplete(todo.id)}
              aria-label={`할일 ${todo.isCompleted ? "완료 취소" : "완료"}`}
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
      handleContentEdit,
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
