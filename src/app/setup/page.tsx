"use client";

import { TodoInput } from "@/components/todo/TodoInput";
import { TodoList } from "@/components/todo/TodoList";
import { useTodoStore } from "@/features/todo/stores/todoStore";
import { useUserSetup } from "@/features/user/hooks/useUserSetup";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RouteGuard } from "@/components/common/RouteGuard";

const SetupPage = () => {
  const addTodo = useTodoStore((state) => state.addTodo);
  const { completeSetup, isUpdating } = useUserSetup();

  const handleCompleteSetup = () => {
    completeSetup();
  };

  return (
    <RouteGuard requireSetup={false}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen px-[5%] md:px-[20%] flex items-center justify-center flex-col bg-black text-white p-4"
      >
        <h1 className="text-4xl font-bold mb-9 text-center">
          매일 <span className="text-yellow-400">할 일</span>을 추가해요!
        </h1>
        <div className="flex flex-col gap-5 w-full">
          <TodoInput onSubmit={addTodo} />
          <TodoList />
          <Button
            onClick={handleCompleteSetup}
            disabled={isUpdating}
            className="mt-4 w-full md:w-auto ml-auto bg-green-500 hover:bg-green-600"
          >
            {isUpdating ? "설정 중..." : "설정 완료"}
          </Button>
        </div>
      </motion.div>
    </RouteGuard>
  );
};

export default SetupPage;
