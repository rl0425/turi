export interface TodoDay {
  key: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  label: string;
}

export interface TodoInputProps {
  onSubmit: (content: string, days: TodoDay["key"][]) => Promise<void>;
  className?: string;
}

export interface TodoDaySelectorProps {
  selectedDays: TodoDay["key"][];
  onChange: (days: TodoDay["key"][]) => void;
  className?: string;
}
