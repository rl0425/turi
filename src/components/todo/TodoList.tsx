import { useTodos } from "@/features/todo/hooks/useTodos";
import { TodoListSkeleton } from "./TodoListSkeleton";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const { todos, isLoading } = useTodos();

  if (isLoading) return <TodoListSkeleton />;

  return (
    <ul className="space-y-4 mt-8">
      {todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => {}}
          onDelete={() => {}}
        />
      ))}
    </ul>
  );
};
