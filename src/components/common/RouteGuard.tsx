import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserSetup } from "@/features/user/hooks/useUserSetup";

interface RouteGuardProps {
  children: React.ReactNode;
  requireSetup: boolean; // true: 설정 완료 필요, false: 설정 미완료 필요
}

/**
 * 사용자의 설정 상태에 따라 라우팅을 제어하는 컴포넌트
 */
export const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  requireSetup,
}) => {
  const router = useRouter();
  const { hasCompletedSetup, isLoading } = useUserSetup();

  useEffect(() => {
    if (!isLoading) {
      if (requireSetup && !hasCompletedSetup) {
        router.push("/setup");
      } else if (!requireSetup && hasCompletedSetup) {
        router.push("/dashboard");
      }
    }
  }, [hasCompletedSetup, isLoading, requireSetup, router]);

  // 로딩 중에는 로딩 UI 표시
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  // 조건에 맞는 경우에만 자식 컴포넌트 렌더링
  if (
    (requireSetup && hasCompletedSetup) ||
    (!requireSetup && !hasCompletedSetup)
  ) {
    return <>{children}</>;
  }

  // 리다이렉트 중에는 빈 화면
  return null;
};
