import { useCallback } from "react";
import type { TodoDay } from "@/components/todo/TodoInput/types";
import { useTodoStore } from "../stores/todoStore";

export const useTodoInput = () => {
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = useCallback(
    async (content: string, days: TodoDay["key"][]) => {
      await addTodo(content, days);
    },
    [addTodo]
  );

  return { handleSubmit };
};
