import { BaseEntity } from "@/features/shared/types";

export interface Todo extends BaseEntity {
  content: string;
  isCompleted: boolean;
  userId: string;
  priority: TodoPriority;
  dueDate?: string | null;
}

export type TodoPriority = "low" | "medium" | "high";

export interface TodoFilters {
  isCompleted?: boolean;
  priority?: TodoPriority;
}
