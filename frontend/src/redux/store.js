import {applyMiddleware, combineReducers, createStore} from "redux";
import itemsReducer from "./reducers/itemsReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from "./reducers/userReducer";
import allUsersReducer from "./reducers/allUsersReducer";


let reducers = combineReducers({
    itemsPage : itemsReducer,
    user : userReducer,
    allUsers : allUsersReducer,
})

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))

export default store