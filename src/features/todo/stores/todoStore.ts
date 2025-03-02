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
  updateTodo: (
    id: string,
    updates: Partial<Omit<Todo, "id">>,
    completedDays?: number[]
  ) => void;
  deleteTodo: (id: string) => void;
  toggleEdit: (id: string | null) => void;
  saveTodos: () => Promise<void>;
}

type TodoStore = TodoState & TodoActions;

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [
    {
      id: "1",
      title: "밥 음팡지게 맛있게 호로록 먹기",
      days: [1, 3, 5],
      description: "asdasdsadas",
      dueDate: undefined,
      completed: false,
      completedDays: [],
    },
    {
      id: "2",
      title: "밥 음팡지게 맛있게 호로록 먹기",
      days: [2, 4],
      description: "",
      dueDate: undefined,
      completed: false,
      completedDays: [],
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
          title: content,
          days,
          description: "",
          dueDate: undefined,
          completed: false,
          completedDays: [],
          createdAt: new Date(),
        },
      ],
    }));
  },

  updateTodo: (id, updates, completedDays) => {
    set((state) => {
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        console.log("updates =", updates);
        const updatedTodos = [...state.todos];
        updatedTodos[todoIndex] = {
          ...updatedTodos[todoIndex],
          ...updates,
        };
        
        if (completedDays !== undefined) {
          updatedTodos[todoIndex].completedDays = completedDays;
        }
        
        return { todos: updatedTodos };
      }
      return state;
    });
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
