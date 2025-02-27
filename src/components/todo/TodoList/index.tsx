import { useTodoStore } from "@/features/todo/stores/todoStore";
import { TodoInput } from "../TodoInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TodoDay } from "@/features/todo/types";
import { useCallback, memo } from "react";

interface TodoItemProps {
  todo: {
    id: string;
    content: string;
    days: number[] | TodoDay["key"][];
  };
  editingId: string | null;
  onEdit: (id: string, content: string, days: number[]) => Promise<void>;
  onToggleEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = memo(
  ({ todo, editingId, onEdit, onToggleEdit, onDelete }: TodoItemProps) => {
    const isEditing = editingId === todo.id;

    return (
      <div className="flex items-center gap-4 p-4 bg-black border border-border rounded-lg">
        {isEditing ? (
          <>
            <TodoInput
              content={todo.content}
              days={todo.days as TodoDay["key"][]}
              onSubmit={(content, days) => onEdit(todo.id, content, days)}
              submitLabel="수정"
              className="flex-1"
            />
            {/* <span className="text-yellow-400">수정중...</span> */}
          </>
        ) : (
          <>
            <span className="flex-1">{todo.content}</span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                onClick={() => onToggleEdit(todo.id)}
                className="text-yellow-400"
                aria-label="할일 수정"
              >
                수정
              </Button>
              <Button
                variant="ghost"
                onClick={() => onDelete(todo.id)}
                className="text-yellow-400"
                aria-label="할일 삭제"
              >
                삭제
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }
);

TodoItem.displayName = "TodoItem";

export const TodoList = () => {
  const { todos, editingId, updateTodo, deleteTodo, toggleEdit, saveTodos } =
    useTodoStore();
  const { toast } = useToast();

  const handleEdit = useCallback(
    async (id: string, content: string, days: number[]) => {
      await updateTodo(id, content, days);
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

  const handleSave = useCallback(async () => {
    try {
      await saveTodos();
      toast({
        title: "모든 변경사항이 저장되었습니다",
        variant: "default",
      });
    } catch (error) {
      console.error("Todo 저장 실패:", error);
      toast({
        title: "저장에 실패했습니다",
        description: "다시 시도해주세요",
        variant: "destructive",
      });
    }
  }, [saveTodos, toast]);

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400 min-h-[300px]">
        <p>등록된 할일이 없습니다.</p>
        <p className="mt-2 text-sm">새로운 할일을 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col w-full h-full"
      aria-label="할일 목록"
      role="list"
    >
      <div className="flex-1 max-h-[70vh] md:max-h-[400px] stable-scrollbar">
        <div className="flex flex-col gap-4 content-container">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              editingId={editingId}
              onEdit={handleEdit}
              onToggleEdit={handleToggleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      <Button
        onClick={handleSave}
        className="mt-4 w-full md:w-auto ml-auto"
        aria-label="모든 변경사항 저장"
      >
        모든 변경사항 저장
      </Button>
    </div>
  );
};
