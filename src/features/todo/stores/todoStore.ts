import { create } from "zustand";
import type { Todo, TodoFilters } from "../types";

interface TodoState {
  todos: Todo[];
  filters: TodoFilters;
  editingId: string | null;
}

interface TodoActions {
  setTodos: (todos: Todo[]) => void;
  setFilters: (filters: TodoFilters) => void;
  addTodo: (content: string, days: number[]) => void;
  updateTodo: (id: string, content: string, days: number[]) => void;
  deleteTodo: (id: string) => void;
  toggleEdit: (id: string | null) => void;
  saveTodos: () => Promise<void>;
}

type TodoStore = TodoState & TodoActions;

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [
    {
      id: "1",
      content: "밥 음팡지게 맛있게 호로록 먹기",
      days: [1, 3, 5],
      isCompleted: false,
    },
    {
      id: "2",
      content: "밥 음팡지게 맛있게 호로록 먹기",
      days: [2, 4],
      isCompleted: false,
    },
  ],
  filters: {},
  editingId: null,

  setTodos: (todos) => set({ todos }),
  setFilters: (filters) => set({ filters }),

  addTodo: (content, days) => {
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Math.random().toString(36).substr(2, 9),
          content,
          days,
          isCompleted: false,
        },
      ],
    }));
  },

  updateTodo: (id, content, days) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, content, days } : todo
      ),
    }));
  },

  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  toggleEdit: (id) => {
    set({ editingId: id });
  },

  saveTodos: async () => {
    console.log("Todos saved:", get().todos);
  },
}));
