"use client";

import { TodoInput } from "@/components/todo/TodoInput";
import { TodoList } from "@/components/todo/TodoList";
import { useTodoStore } from "@/features/todo/stores/todoStore";
import { motion } from "framer-motion";

const Page = () => {
  const addTodo = useTodoStore((state) => state.addTodo);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen min-w-screen flex items-center justify-center flex-col bg-black text-white p-4"
    >
      <h1 className="text-4xl font-bold mb-9">
        매일 <span className="text-yellow-400">할 일</span>을 추가해요!
      </h1>
      <TodoInput onSubmit={addTodo} />
      <TodoList />
    </motion.div>
  );
};

export default Page;
