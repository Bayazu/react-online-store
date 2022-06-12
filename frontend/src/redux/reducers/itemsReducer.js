import {itemsAPI, productAPI, usersAPI} from "../../api/api";
import {getUsersAC, toggleIsFetchingAC} from "./allUsersReducer";

const SET_ITEMS_DATA = 'SET_ITEMS_DATA'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    items: null,
    isFetching: false,
}

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEMS_DATA:
            return {
                ...state,
                items: action.data,
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

export const setItemsData = (data) => ({type: SET_ITEMS_DATA, data: data})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})

export const getItems = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        return itemsAPI.getItems().then(response => {
                if(response.status === 200 ){
                    dispatch(setItemsData(response.data))
                    dispatch(toggleIsFetching(false))
                    return response
                }
                return  response
            });
    }
}

export const createNewProduct= (data) =>{
    return (dispatch) => {
        return productAPI.createNewProduct(data).then(response =>{
            if(response.status === 200){
                return response
            }
            return response
        })
    }
}


export default itemsReducer;