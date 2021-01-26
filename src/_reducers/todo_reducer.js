export default function (state = {}, action) {
  switch (action.type) {
    // 새 일정 생성 action을 reduce
    case "CREATE_TODO":
      return { ...state, newTodo: action.payload };

    // 중요 Toggle action을 reduce
    case "TOGGLE_IMPORTANT":
      return { ...state, isImportant: action.payload };

    // 완료 Toggle action을 reduce
    case "TOGGLE_COMPLETE":
      return { ...state, isComplete: action.payload };

    // 일정 내용수정 action을 reduce
    // case "UPDATE_CONTENT":
    //   return { ...state, fixedTodo: action.payload };

    // 일정 삭제 action을 reduce
    // case "DELETE_TODO":
    //   return { ...state, isDelete: true };
    default:
      return state;
  }
}
