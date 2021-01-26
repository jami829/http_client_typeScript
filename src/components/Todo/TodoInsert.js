import React, { useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import "./TodoStyle/TodoInsert.scss";

const TodoInsert = ({ onInsert }) => {
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");

  const onContentHandle = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  const onDateHandle = useCallback((e) => {
    setStartDate(e.target.value);
  }, []);

  // onClick 이벤트 + onKeyboard 이벤트 "Enter"를 하나로!
  const onSubmit = useCallback(
    (e) => {
      onInsert(content, startDate);
      setContent("");
      setStartDate("");
      e.preventDefault();
    },
    [onInsert, [content, startDate]]
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        className="todo-date"
        placeholder="YYYY-MM-DD"
        name="startDate" // onChange 이벤트 입력을 위한 {name: value} 지정
        value={startDate}
        onChange={onDateHandle}
        type="date"
      />
      <input
        className="todo-content"
        placeholder="할 일을 입력하세요"
        value={content}
        onChange={onContentHandle}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
