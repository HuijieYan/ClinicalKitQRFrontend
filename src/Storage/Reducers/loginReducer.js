import { combineReducers } from "redux";
import hospitalIdReducer from "./hospitalIdReducer";
import levelReducer from "./levelReducer";
import usernameReducer from "./usernameReducer";
import trustIdReducer from "./trustIdReducer";
import nameReducer from "./nameReducer";
import expireTimeReducer from "./expireTimeReducer";
import passwordReducer from "./passwordReducer";

//reducers are responsible for set and get the local stored data

export const loginReducer = combineReducers({
    name:nameReducer,
    username:usernameReducer,
    level:levelReducer,
    trustId:trustIdReducer,
    hospitalId:hospitalIdReducer,
    expireTime: expireTimeReducer,
    password: passwordReducer
});