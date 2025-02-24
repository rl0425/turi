import { TodoInput } from "@/components/todo/TodoInput";
import { TodoList } from "@/components/todo/TodoList";
import { motion } from "framer-motion";

export default function MainPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-white p-4"
    >
      <h1 className="text-2xl font-bold mb-8">
        안녕하세요! <span className="text-yellow-400">오늘의 할일</span>은
        무엇인가요?
      </h1>
      <TodoInput onSubmit={() => {}} />
      <TodoList />
    </motion.div>
  );
}
