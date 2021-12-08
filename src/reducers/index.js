import { combineReducers } from "redux";
import counter from "./counter";
import ui from "./ui";

/* 각각의 리듀서를 하나로 통합 */
const reducers = combineReducers({
    counter, ui
});

export default reducers;