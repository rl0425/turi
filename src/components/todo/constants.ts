export const TODO_LIST_CONSTANTS = {
  MESSAGES: {
    EMPTY: {
      MAIN: "할 일이 없습니다.",
      SUB: "새로운 할 일을 추가해보세요.",
    },
    TOAST: {
      SAVE_SUCCESS: "할 일이 저장되었습니다.",
      SAVE_ERROR: "할 일 저장에 실패했습니다.",
      SAVE_ERROR_DETAIL: "다시 시도하거나 관리자에게 문의하세요.",
    },
    TODAY: "오늘",
    RETURN_TODAY: "오늘로 돌아가기",
  },
  BUTTONS: {
    SAVE_ALL: "모두 저장",
  },
  STYLES: {
    EMPTY_CONTAINER:
      "flex flex-col items-center justify-center h-full text-gray-400 py-8",
    LIST_CONTAINER: "flex flex-col h-full",
    LIST_CONTENT: "flex-1 overflow-auto px-1 py-2",
    ITEMS_CONTAINER: "space-y-2",
    ITEM_CONTAINER:
      "flex items-center p-3 bg-card rounded-lg border border-border",
    ITEM_CONTENT: "flex-1 truncate",
    ITEM_COMPLETED: "line-through text-gray-400",
    BUTTON_EDIT: "p-1 text-gray-400 hover:text-primary",
    BUTTON_DELETE: "p-1 text-gray-400 hover:text-red-500 ml-1",
  },
  ARIA: {
    LIST: "할 일 목록",
    EDIT: "수정",
    DELETE: "삭제",
    SAVE_ALL: "모든 할 일 저장",
    SELECT_DAY: "요일 선택",
    RETURN_TODAY: "오늘 날짜로 돌아가기",
  },
  DAYS: [
    { key: 0, label: "월" },
    { key: 1, label: "화" },
    { key: 2, label: "수" },
    { key: 3, label: "목" },
    { key: 4, label: "금" },
    { key: 5, label: "토" },
    { key: 6, label: "일" },
  ],
};
