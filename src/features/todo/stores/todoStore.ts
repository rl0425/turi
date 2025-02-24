import { create } from "zustand";
import { Todo, TodoFilters } from "../types";
import { supabase } from "@/features/shared/lib/supabase";

interface TodoState {
  todos: Todo[];
  filters: TodoFilters;
}

interface TodoActions {
  setTodos: (todos: Todo[]) => void;
  setFilters: (filters: TodoFilters) => void;
  addTodo: (content: string) => Promise<void>;
  //   updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  //   deleteTodo: (id: string) => Promise<void>;
}

type TodoStore = TodoState & TodoActions;

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  filters: {},
  setTodos: (todos: Todo[]) => set({ todos }),
  setFilters: (filters: TodoFilters) => set({ filters }),
  addTodo: async (content: string) => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      throw new Error("User not found");
    }
    const newTodo: Partial<Todo> = {
      content,
      isCompleted: false,
      isDeleted: false,
      userId: userData.user?.id,
      createdAt: new Date().toISOString(),
    };

    set((state: TodoStore) => ({
      todos: [...state.todos, newTodo as Todo],
    }));
  },
}));
