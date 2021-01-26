import React, { useCallback } from "react";
import { List } from "react-virtualized";
import TodoListItem from "./TodoListItem";
// import ToggledItem from "./ToggledItem";
import Axios from "axios";
// import "./TodoStyle/TodoList.scss";

const ImportantTodo = ({ todos }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return <ToggledItem todo={todo} key={key} style={style} />;
    },
    [todos]
  );

  return (
    <List
      className="TodoList"
      width={732}
      height={600}
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRenderer}
      list={todos}
      style={{ outline: "none" }}
    />
  );
};

export default ImportantTodo;
