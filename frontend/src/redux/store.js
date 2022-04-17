import {applyMiddleware, combineReducers, createStore} from "redux";
import itemsReducer from "./reducers/itemsReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from "./reducers/userReducer";


let reducers = combineReducers({
    itemsPage : itemsReducer,
    user : userReducer,
})

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))

export default store