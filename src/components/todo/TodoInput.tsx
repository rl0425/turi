import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

interface TodoInputProps {
  onSubmit: (content: string) => void;
}

export const TodoInput = ({ onSubmit }: TodoInputProps) => {
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) {
      toast({
        title: "할 일을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }
    try {
      await onSubmit(content);
      setContent("");
      toast({
        title: "할 일이 추가되었습니다.",
      });
    } catch (error) {
      toast({
        title: "할 일 추가에 실패했습니다.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="할 일을 추가해보세요!"
        className="flex-1"
      />
      <Button type="submit">추가</Button>
    </form>
  );
};
