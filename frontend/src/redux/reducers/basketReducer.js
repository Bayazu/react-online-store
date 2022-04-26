import {itemsAPI, usersAPI} from "../../api/api";
import {getUsersAC, toggleIsFetchingAC} from "./allUsersReducer";

const SET_BASKET = 'SET_BASKET'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    basket: [],
    isFetching: false,
}

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BASKET:
            let newProduct = {
                amountInOrder: action.data.amount,
                productSummaryPrice: action.data.productSummaryPrice,
                ...action.data.product
            };
            return {
                ...state,
                basket: [...state.basket, newProduct]
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

export const setBasketProductsAC = (data) => ({type: SET_BASKET, data: data})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})

export const setBasketProducts = (data) => {
    return (dispatch) => {
        dispatch(setBasketProductsAC(data))
    }
}

// export const getItems = () => {
//     return (dispatch) => {
//         dispatch(toggleIsFetching(true));
//         return itemsAPI.getItems().then(response => {
//             if(response.status === 200 ){
//                 dispatch(setItemsData(response.data))
//                 dispatch(toggleIsFetching(false))
//                 return response
//             }
//             return  response
//         });
//     }
// }


export default itemsReducer;