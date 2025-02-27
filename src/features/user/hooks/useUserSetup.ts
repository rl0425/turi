import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { checkUserSetupStatus, updateUserSetupStatus, resetUserSetupStatus } from '@/services/mock/userService';

/**
 * 사용자 초기 설정 상태를 관리하는 커스텀 훅
 * @returns 사용자 초기 설정 관련 상태 및 함수
 */
export const useUserSetup = () => {
  const queryClient = useQueryClient();

  // 사용자 설정 상태 조회
  const { data: hasCompletedSetup = false, isLoading } = useQuery({
    queryKey: ['userSetup'],
    queryFn: checkUserSetupStatus,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });

  // 사용자 설정 상태 업데이트 뮤테이션
  const { mutate: completeSetup, isPending: isUpdating } = useMutation({
    mutationFn: updateUserSetupStatus,
    onSuccess: () => {
      // 뮤테이션 성공 시 관련 쿼리 무효화하여 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ['userSetup'] });
    },
  });

  // 개발용: 사용자 설정 상태 초기화 뮤테이션
  const { mutate: resetSetup } = useMutation({
    mutationFn: resetUserSetupStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSetup'] });
    },
  });

  return {
    hasCompletedSetup,
    isLoading,
    completeSetup,
    resetSetup, // 개발 중 테스트용
    isUpdating,
  };
}; 