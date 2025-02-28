"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { RouteGuard } from "@/components/common/RouteGuard";
import { Button } from "@/components/ui/button";

const Home = () => {
  const router = useRouter();

  return (
    <RouteGuard requireSetup={false}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center flex-col bg-black text-white p-4"
      >
        <h1 className="text-4xl font-bold mb-4 text-center">
          안녕하세요! <span className="text-yellow-400">오늘의 할일</span>은
          무엇인가요?
        </h1>
        <Button
          className="mt-8 px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500"
          onClick={() => router.push("/setup")}
        >
          할 일을 추가해요! +
        </Button>
      </motion.div>
    </RouteGuard>
  );
};

export default Home;
