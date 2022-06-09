import {applyMiddleware, combineReducers, createStore} from "redux";
import itemsReducer from "./reducers/itemsReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from "./reducers/userReducer";
import allUsersReducer from "./reducers/allUsersReducer";
import basketReducer from "./reducers/basketReducer";
import ordersReducer from "./reducers/ordersReducer";


let reducers = combineReducers({
    itemsPage : itemsReducer,
    user : userReducer,
    allUsers : allUsersReducer,
    basket : basketReducer,
    orders: ordersReducer,
})

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))

export default store