import {combineReducers} from "redux";
import userList from "./userList";
import redirect from './redirect';
import searchInput from './searchInput';
import pageStatus from './pageStatus';
//import { setPageStatus } from "../action-creator";
//import userDetails from "./userDetails";

const reducer = combineReducers({
    userList,
    pageStatus,
    redirect,
    searchInput
});

export default reducer;