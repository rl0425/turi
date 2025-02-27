import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TodoDaySelector } from "./TodoDaySelector";
import type { TodoInputProps } from "@/features/todo/types";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export const TodoInput = ({
  onSubmit,
  content: initialContent = "",
  days: initialDays = [0, 1, 2, 3, 4, 5, 6],
  submitLabel = "추가",
  className,
}: TodoInputProps) => {
  const [content, setContent] = useState(initialContent);
  const [selectedDays, setSelectedDays] = useState(initialDays);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast({
        title: "할 일을 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    if (selectedDays.length === 0) {
      toast({
        title: "요일을 선택해주세요",
        variant: "destructive",
      });
      return;
    }

    try {
      await onSubmit(content.trim(), selectedDays);
      if (!initialContent) {
        setContent("");
        // setSelectedDays([]);
      }
      toast({
        title: `할 일이 ${submitLabel}되었습니다`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: `할 일 ${submitLabel}에 실패했습니다`,
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-row items-center gap-4 w-full", className)}
    >
      <div className="flex flex-col gap-3 w-full items-left border border-border rounded-lg py-3 px-4">
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="여기에 입력하세요!"
          className="flex-1 focus-visible:ring-0"
        />
        <TodoDaySelector
          selectedDays={selectedDays}
          onChange={setSelectedDays}
          className="mb-2"
        />
      </div>
      <Button type="submit" className="w-14 font-bold">
        {submitLabel}
      </Button>
    </form>
  );
};
