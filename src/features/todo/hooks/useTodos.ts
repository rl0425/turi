import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types";
import { useTodoStore } from "../stores/todoStore";
import { supabase } from "@/features/shared/lib/supabase";

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

  return {
    todos: data,
    isLoading,
    addTodo: addTodoMutation.mutate,
  };
};
