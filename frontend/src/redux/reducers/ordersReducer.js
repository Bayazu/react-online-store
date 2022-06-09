import {ordersAPI} from "../../api/api";

const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    allOrders: null,
    isFetching: false,
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}


export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})

export const getAllOrders = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        return ordersAPI.getAllOrders().then(response => {
            if(response.status === 200 ){
                dispatch(toggleIsFetching(false))
                return response
            }
            return  response
        });
    }
}


export default ordersReducer;