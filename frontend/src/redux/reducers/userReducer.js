import {usersAPI} from "../../api/api";

const LOGIN_USER = 'LOGIN_USER'
const CREATE_USER = 'CREATE_USER'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    token: null,
    isUserAuth : false,
    isFetching: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            console.log(action)
            return {
                ...state,
                token: action.data,
                isUserAuth: true,
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

export const loginUserAC = (data) => ({type: LOGIN_USER, data: data})
export const createNewUser = (data) => ({type: CREATE_USER, data: data})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})


export const loginUser = (token) =>{
    return (dispatch) => {
        console.log(token)
        dispatch(loginUserAC(token))
    }
}

// export const getItems = () => {
//     return (dispatch) => {
//         dispatch(toggleIsFetching(true));
//         itemsAPI.getItems()
//             .then(response => {
//                 if(response.status === 200 ){
//                     dispatch(setItemsData(response.data))
//                     dispatch(toggleIsFetching(false))
//                 }
//             });
//     }
// }

    // .then(function (response) {
    //     if(response.status === 200) {
    //         navigate("/login");
    //     }
    // })
    // .catch(function (error) {
    //     console.log(error.response.data.errors.errors[0].msg);
    // })

// export const createUser = (data) => {
//     return (dispatch) => {
//         dispatch(toggleIsFetching(true));
//             usersAPI.createUser(data).then(response=>{
//                 return response
//             })
//     }
// }


export default userReducer;