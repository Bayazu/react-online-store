import {ordersAPI} from "../../api/ordersAPI";

const SET_BASKET = 'SET_BASKET'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const CHANGE_BASKET = 'CHANGE_BASKET'
const GET_SUMMARY_PRICE = 'GET_SUMMARY_PRICE'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const CLEAR_BASKET = 'CLEAR_BASKET'

let initialState = {
    basket: [],
    isFetching: false,
    totalProductsPrice: null,
}

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BASKET:
            let newProduct = {
                amountInOrder: action.data.amount,
                productSummaryPrice: action.data.productSummaryPrice, ...action.data.product
            };
            return {
                ...state, basket: [...state.basket, newProduct]
            }
        case CHANGE_BASKET:
            return {
                ...state, basket: state.basket?.map(product => product._id === action.data.id ? {
                    ...product,
                    productSummaryPrice: action.data.productSummaryPrice,
                    amountInOrder: action.data.amountInOrder
                } : product)
            }
        case GET_SUMMARY_PRICE:
            let initialValue = 0;
            const sum = state.basket?.reduce(
                (accumulator, currentValue) => accumulator + currentValue.productSummaryPrice,
                initialValue
            )
            return {
                ...state, totalProductsPrice: sum
            }
        case REMOVE_PRODUCT:
            return {
                ...state, basket: state.basket?.filter(product => product._id !== action.id)
            }
        case CLEAR_BASKET :
            return {
                ...state, basket: []
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        default:
            return state;
    }
}

export const setBasketProductsAC = (data) => ({type: SET_BASKET, data: data})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})
export const changeBasketAC = (data) => ({type: CHANGE_BASKET, data: data})
export const getTotalProductsPriceAC = () => ({type: GET_SUMMARY_PRICE})
export const clearBasketAC = () => ({type: CLEAR_BASKET})
export const removeProductFromBasketAC = (id) => ({type : REMOVE_PRODUCT, id: id})

export const clearBasket = () =>{
    return (dispatch) =>{
        dispatch(clearBasketAC())
    }
}

export const setBasketProducts = (data) => {
    return (dispatch) => {
        dispatch(setBasketProductsAC(data))
    }
}
export const changeBasket = (data) => {
    return (dispatch) => {
        dispatch(changeBasketAC(data))
    }
}

export const getTotalProductsPrice = () =>{
    return (dispatch) =>{
        dispatch(getTotalProductsPriceAC())
    }
}

export const removeProductFromBasket = (id) => {
    return (dispatch) => {
        dispatch(removeProductFromBasketAC(id))
    }
}

export const createOrder = (basketData) => {
    return (dispatch) => {
        return ordersAPI.orderCreat(basketData).then((response) => {
            if (response?.status === 200) {
                return response
            }
            return response
        })
    }
}




export default itemsReducer;