// 로컬 스토리지 키
const USER_SETUP_KEY = 'user_setup_status';

/**
 * 사용자 초기 설정 상태 확인 (Mock)
 * @returns {Promise<boolean>} 초기 설정 완료 여부
 */
export const checkUserSetupStatus = async (): Promise<boolean> => {
  // 실제 구현에서는 비동기 작업이므로 Promise로 래핑
  return new Promise((resolve) => {
    // 지연 시간 추가하여 실제 API 호출처럼 보이게 함
    setTimeout(() => {
      const status = localStorage.getItem(USER_SETUP_KEY);
      resolve(status === 'true');
    }, 100);
  });
};

/**
 * 사용자 초기 설정 완료 상태 업데이트 (Mock)
 * @returns {Promise<void>}
 */
export const updateUserSetupStatus = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(USER_SETUP_KEY, 'true');
      resolve();
    }, 100);
  });
};

/**
 * 사용자 초기 설정 상태 초기화 (개발용)
 * @returns {Promise<void>}
 */
export const resetUserSetupStatus = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem(USER_SETUP_KEY);
      resolve();
    }, 100);
  });
}; 