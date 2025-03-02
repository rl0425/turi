import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types";
import { useTodoStore } from "../stores/todoStore";
import { supabase } from "@/features/shared/lib/supabase";
import { useCallback } from "react";

export const useTodos = () => {
  const queryClient = useQueryClient();
  const { filters, setTodos } = useTodoStore();

  const { data, isLoading } = useQuery({
    queryKey: ["todos", filters],
    queryFn: async () => {
      let query = supabase.from("todos").select("*").eq("isDeleted", false);

      if (filters.isCompleted !== undefined) {
        query = query.eq("isCompleted", filters.isCompleted);
      }

      if (filters.priority) {
        query = query.eq("priority", filters.priority);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }
      setTodos(data);
      return data as Todo[];
    },
  });

  const addTodoMutation = useMutation({
    mutationFn: async (content: string) => {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ content }]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", filters] });
    },
  });

  const updateTodo = useCallback(
    async (
      id: string,
      content: string,
      days: number[],
      isCompleted?: boolean,
      completedDays?: number[]
    ) => {
      setTodos((prevTodos: Todo[]) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            const updatedCompletedDays =
              completedDays !== undefined
                ? completedDays
                : todo.completedDays || [];

            if (
              isCompleted !== undefined &&
              isCompleted !== (todo.completedDays?.length === 7)
            ) {
              const newCompletedDays = isCompleted ? [0, 1, 2, 3, 4, 5, 6] : [];
              return {
                ...todo,
                content,
                days,
                completedDays: newCompletedDays,
              };
            }

            return {
              ...todo,
              content,
              days,
              completedDays: updatedCompletedDays,
            };
          }
          return todo;
        });
      });
    },
    []
  );

  const addTodo = useCallback(async (content: string, days: number[]) => {
    const newTodo: Todo = {
      id: generateId(),
      content,
      days,
      completedDays: [],
      createdAt: Date.now(),
    };

    setTodos((prevTodos: Todo[]) => [...prevTodos, newTodo]);
  }, []);

  return {
    todos: data,
    isLoading,
    addTodo: addTodoMutation.mutate,
    updateTodo,
    addTodo: addTodo,
  };
};
