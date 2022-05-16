const SET_BASKET = 'SET_BASKET'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const CHANGE_BASKET = 'CHANGE_BASKET'
const GET_SUMMARY_PRICE = 'GET_SUMMARY_PRICE'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

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
            console.log(state.basket)
            return {
                ...state, basket: [...state.basket, newProduct]
            }
        case CHANGE_BASKET:
            console.log(action);
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
export const removeProductFromBasketAC = (id) => ({type : REMOVE_PRODUCT, id: id})

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



export default itemsReducer;