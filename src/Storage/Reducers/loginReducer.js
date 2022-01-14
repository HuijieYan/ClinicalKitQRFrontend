import { combineReducers } from "redux";
import hospitalIdReducer from "./hospitalIdReducer";
import levelReducer from "./levelReducer";
import nameReducer from "./nameReducer";
import trustIdReducer from "./trustIdReducer";

export const loginReducer = combineReducers({
    name:nameReducer,
    level:levelReducer,
    trustId:trustIdReducer,
    hospitalId:hospitalIdReducer
});