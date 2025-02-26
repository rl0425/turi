import { useTodoStore } from "@/features/todo/stores/todoStore";
import { TodoInput } from "../TodoInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const TodoList = () => {
  const { todos, editingId, updateTodo, deleteTodo, toggleEdit, saveTodos } =
    useTodoStore();
  const { toast } = useToast();

  const handleEdit = async (id: string, content: string, days: number[]) => {
    updateTodo(id, content, days);
    toggleEdit(null);
  };

  const handleSave = async () => {
    try {
      await saveTodos();
      toast({
        title: "모든 변경사항이 저장되었습니다",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "저장에 실패했습니다",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg"
        >
          {editingId === todo.id ? (
            <>
              <TodoInput
                content={todo.content}
                days={todo.days}
                onSubmit={(content, days) => handleEdit(todo.id, content, days)}
                submitLabel="수정"
                className="flex-1"
              />
              <span className="text-yellow-400">수정중...</span>
            </>
          ) : (
            <>
              <span className="flex-1">{todo.content}</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => toggleEdit(todo.id)}
                  className="text-yellow-400"
                >
                  수정
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-400"
                >
                  삭제
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
      <Button onClick={handleSave} className="mt-4">
        모든 변경사항 저장
      </Button>
    </div>
  );
};
