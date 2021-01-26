import React, { useCallback } from "react";
import { List } from "react-virtualized";
import TodoListItem from "./TodoListItem";
import "./TodoStyle/TodoList.scss";

const TodoList = ({
  todos,
  onRemove,
  onToggleOfImportant,
  onToggleOfComplete,
}) => {
  // react-virtualized 의존성을 활용한 최적화
  // 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 자리예약만 하게끔 처리
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggleOfImportant={onToggleOfImportant}
          onToggleOfComplete={onToggleOfComplete}
          style={style}
        />
      );
    },
    [onRemove, onToggleOfImportant, onToggleOfComplete, todos]
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

export default React.memo(TodoList);
