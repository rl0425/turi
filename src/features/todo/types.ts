export interface Todo {
  id: string;
  content: string;
  days: number[];
  completedDays: number[]; // 완료된 요일을 추적하는 배열 추가
  createdAt: number;
}

export interface TodoInputProps {
  onSubmit: (content: string, days: number[]) => Promise<void>;
  content?: string;
  days?: (0 | 1 | 2 | 3 | 4 | 5 | 6)[];
  submitLabel?: string;
  className?: string;
}
