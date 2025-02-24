import { Todo } from "@/features/todo/types";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const priorityColors = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  return (
    <li className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
      <Checkbox
        checked={todo.isCompleted}
        onCheckedChange={() => onToggle?.(todo.id)}
      />
      <span
        className={cn(
          "flex-1",
          todo.isCompleted && "line-through",
          priorityColors[todo.priority]
        )}
      >
        {todo.content}
      </span>
      <Badge className={priorityColors[todo.priority]}>{todo.priority}</Badge>
      {onDelete && (
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-400"
        >
          삭제
        </button>
      )}
    </li>
  );
};
