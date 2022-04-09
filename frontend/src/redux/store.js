import {applyMiddleware, combineReducers, createStore} from "redux";
import itemsReducer from "./reducers/itemsReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';


let reducers = combineReducers({
    itemsPage : itemsReducer
})

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))

export default store