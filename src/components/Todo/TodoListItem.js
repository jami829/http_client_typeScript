import React from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdStar,
  MdStarBorder,
  MdRemoveCircleOutline,
} from "react-icons/md";
import cn from "classnames";
import Moment from "react-moment";
import "./TodoStyle/TodoListItem.scss";

const TodoListItem = ({
  todo,
  onToggleOfImportant,
  onToggleOfComplete,
  onRemove,
  // onToggleOfEdit,
  style,
}) => {
  const { id, content, important, complete, startDate } = todo;

  // react-virtualized 의존성을 활용한 최적화
  // 렌더링 안된 리스트들에 대한 outline: none 스타일을 적용
  return (
    <div className={"TodoListItem-virtualized"} style={style}>
      <div className="TodoListItem">
        <Moment className={cn("todo-date", { important })} format="YYYY-MM-DD">
          {startDate}
        </Moment>
        <div
          className={cn("important-check", { important })}
          onClick={() => onToggleOfImportant(id)}
        >
          {important ? <MdStar /> : <MdStarBorder />}
        </div>
        <div className="todo-content">{content}</div>
        <div
          className={cn("complete-check", { complete })}
          onClick={() => onToggleOfComplete(id)}
        >
          {complete ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </div>
        {/* <div className="edit" onClick={() => onToggleOfEdit(todoId)}>
          <MdModeEdit />
        </div> */}
        <div className="todo-remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TodoListItem); // props가 바뀌지 않는다면 리렌더링 방지
