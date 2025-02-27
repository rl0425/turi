"use client";

import { TodoList } from "@/components/todo/TodoList";
import { TodoInput } from "@/components/todo/TodoInput";
import { useTodoStore } from "@/features/todo/stores/todoStore";
import { useUserSetup } from "@/features/user/hooks/useUserSetup";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RouteGuard } from "@/components/common/RouteGuard";

const DashboardPage = () => {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const { resetSetup } = useUserSetup(); // 개발용

  return (
    <RouteGuard requireSetup={true}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen px-[5%] md:px-[20%] flex items-center justify-center flex-col bg-black text-white p-4"
      >
        <h1 className="text-4xl font-bold mb-9 text-center">
          오늘의 <span className="text-yellow-400">할 일</span>
        </h1>
        <div className="flex flex-col gap-5 w-full">
          <TodoInput onSubmit={addTodo} />
          {todos.length > 0 ? (
            <TodoList />
          ) : (
            <p className="text-center text-gray-400 my-8">
              할 일이 없습니다. 새로운 할 일을 추가해보세요.
            </p>
          )}

          {/* 개발용 테스트 버튼 - 프로덕션에서는 제거 */}
          <Button
            onClick={() => resetSetup()}
            className="mt-8 w-full md:w-auto ml-auto bg-red-500 hover:bg-red-600"
          >
            개발용: 초기 설정으로 돌아가기
          </Button>
        </div>
      </motion.div>
    </RouteGuard>
  );
};

export default DashboardPage;
