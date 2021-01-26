import Axios from "axios";

// 새 일정 생성 action
export function makeTodo(body) {
  const request = Axios.post("https://api.get-todo.com/postMain", body).then(
    (res) => res.data
  );

  return { type: "CREATE_TODO", payload: request };
}

// 중요 Toggle action
export function clickImportant(body) {
  const request = Axios.patch("https://api.get-todo.com/important", body).then(
    (res) => res.data
  );

  return { type: "TOGGLE_IMPORTANT", payload: request };
}

// 완료 Toggle action
export function clickComplete(body) {
  const request = Axios.patch("https://api.get-todo.com/completed", body).then(
    (res) => res.data
  );

  return { type: "TOGGLE_COMPLETE", payload: request };
}

// 일정 내용수정 action
// export function editTodo(body) {
//   const request = Axios.patch("https://api.get-todo.com/editMain", body).then(
//     (res) => res.data
//   );

//   return { type: "UPDATE_TODO", payload: request };
// }

// 일정 삭제 action
// export function deleteTodo(body) {
//   const request = Axios.post("https://api.get-todo.com/????", body).then(
//     (res) => res.data
//   );

//   return { type: "DELETE_TODO", payload: request };
// }
