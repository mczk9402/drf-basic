import { combineReducers } from "redux";
import meat from "./meat";
import vegetable from "./vegetable";

const rootReducer = combineReducers({
  meat,
  vegetable,
});

export default rootReducer;
