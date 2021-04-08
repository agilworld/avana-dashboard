import { combineReducers } from "redux";
import commonReducer from "./common"

export default combineReducers({
  common: commonReducer,
});
