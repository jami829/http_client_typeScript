import { combineReducers } from "redux";
import todo from "./todo_reducer";

const rootReducer = combineReducers({
  todo,
});

export default rootReducer;
