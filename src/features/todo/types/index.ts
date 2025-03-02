export interface Todo {
  id: string;
  title: string;
  days: number[];
  description: string;
  dueDate?: Date;
  completed: boolean;
  completedDays: number[];
}

export interface TodoDay {
  key: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  label: string;
}

export interface TodoInputProps {
  onSubmit: (content: string, days: TodoDay["key"][]) => void;
  content?: string;
  days?: TodoDay["key"][];
  submitLabel?: string;
  className?: string;
}

export interface TodoDaySelectorProps {
  selectedDays: TodoDay["key"][];
  onChange: (days: TodoDay["key"][]) => void;
  className?: string;
}

export interface TodoFilters {
  isCompleted?: boolean;
  priority?: string;
}

