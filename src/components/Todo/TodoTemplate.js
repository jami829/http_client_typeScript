import React from "react";
import "./TodoStyle/TodoTemplate.scss";

const TodoTemplate = ({ children }) => {
  return (
    <div className="appTemplate">
      <div className="appTitle">&#128540; SET TO-DO!</div>
      <div className="appContent">{children}</div>
    </div>
  );
};

export default TodoTemplate;
