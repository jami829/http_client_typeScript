import React, { useState, useRef, useCallback, useEffect } from "react";
import Axios from "axios";

// components
import TodoTemplate from "../components/Todo/TodoTemplate";
import TodoList from "../components/Todo/TodoList";
import TodoInsert from "../components/Todo/TodoInsert";

// 리덕스 사용
import { useDispatch } from "react-redux";
import {
  makeTodo,
  clickImportant,
  clickComplete,
  // editTodo,
  // deleteTodo,
} from "../_actions/todo_action";

// moment.js 사용
import Moment from "react-moment";
import "./ToDo.css";
// import axios from "axios";

const ToDo = (props) => {
  // 리덕스 dispatch 기능정의
  const dispatch = useDispatch();
  const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   Axios.get("https://api.get-todo.com/getMain", props.userId, {
  //     withCredentials: true
  //   }).then((res) =>
  //     setTodos(res.data)
  //   );
  // }, []);

  // 고유값으로 사용될 id.. 하지만 이것은 컴포넌트 렌더링에 영향을 미쳐선 안된다. 따라서 ref를 이용하여 컴포넌트 바깥에서 다룬다
  // const nextId = useRef(todos.length + 1);

  // 일정 추가
  const onInsert = useCallback((content, startDate) => {
    let body = {
      id: props.userId,
      // todoId: nextId.current,
      content: content,
      startDate: startDate,
      important: false,
    };

    dispatch(makeTodo(body)).then((res) => {
      if (res.payload.newTodo) {
        alert("새 Todo 저장 성공! :)");
        window.location.replace("/");
      } else {
        alert("일정등록 실패");
        window.location.replace("/");
      }
    });

    // nextId.current += 1;
  }, []);

  // 중요 토글
  const onToggleOfImportant = useCallback((todoId) => {
    let body = {
      id: props.userId,
      todoId: todoId,
    };

    dispatch(clickImportant(body)).then((res) => {
      if (res.payload.isImportant) {
        alert("일정에 중요표시 했어요! :)");
        window.location.replace("/");
      } else {
        alert("중요표시 실패");
        window.location.replace("/");
      }
    });
  }, []);

  // 완료 토글
  const onToggleOfComplete = useCallback((todoId) => {
    let body = {
      id: props.userId,
      todoId: todoId,
    };

    dispatch(clickComplete(body)).then((res) => {
      if (res.payload.isComplete) {
        alert("일정을 완료했어요! :)");
        window.location.replace("/");
      } else {
        alert("완료체크 실패");
        window.location.replace("/");
      }
    });
  }, []);

  // 일정 내용 수정
  // const editContent = useCallback((todoId) => {
  //   let body = {
  //     userId: props.userId,
  //     todoId: todoId,
  //     content: ???
  //   };

  //   dispatch(
  //     editTodo(body)).then((res) => {
  //       if (res.payload.fixedTodo) {
  //         alert("일정을 수정했어요! :)");
  //         window.location.replace("/");
  //       }
  //       else {
  //         alert("일정 수정 실패")
  //         window.location.replace("/");
  //       }
  //     })
  // }, []);

  // 일정 삭제
  const onRemove = useCallback((todoId) => {
    alert("삭제했어요(테스트 Alert)");
    // let body = {
    //   id: props.userId,
    //   todoId: todoId,
    // };

    // dispatch(
    //   deleteTodo(body)).then((res) => {
    //     if (res.payload.isDelete) {
    //       alert("일정을 삭제했어요! :)");
    //       window.location.replace("/");
    //     }
    //     else {
    //       alert("삭제 실패")
    //       window.location.replace("/");
    //     }
    //   })
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <Moment
        format="MMM, YYYY"
        style={{
          color: `lightcoral`,
          fontSize: `1.2rem`,
          fontWeight: `800`,
          opacity: `0.4`,
        }}
      >
        {todos.forEach((todo) => todo.startDate)}
      </Moment>
      <TodoList
        todos={todos}
        onToggleOfImportant={onToggleOfImportant}
        onToggleOfComplete={onToggleOfComplete}
        onRemove={onRemove}
      // onToggleOfEdit={onToggleOfEdit}
      />
    </TodoTemplate>
  );
};

export default React.memo(ToDo);
