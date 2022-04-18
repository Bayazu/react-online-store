import {usersAPI} from "../../api/api";
import itemsReducer from "./itemsReducer";

const GET_ALL_USERS = 'GET_ALL_USERS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';



let initialState = {
    users: null,
    isFetching: false,
}

const allUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.users
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


export const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})
export const getUsersAC = (users) => ({type: GET_ALL_USERS, users: users})

export const getUsers = () => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        return usersAPI.getAllUsers().then((response)=>{
            if(response?.status === 200){
                dispatch(getUsersAC(response.data))
                dispatch(toggleIsFetchingAC(false))
                return response
            }
            return  response
        })
    }
}

// export const loginUser = (data) =>{
//     return (dispatch) => {
//         dispatch(toggleIsFetching(true));
//         return usersAPI.loginUser(data).then((response)=>{
//             if(response?.status === 200){
//                 const token = response.data.token;
//                 dispatch(loginUserAC(token))
//                 window.localStorage.setItem('token', token)
//                 dispatch(toggleIsFetching(false));
//                 return response
//             }
//             return response
//         })
//     }
// }
// export const loginUserByToken = (token) =>{
//     return (dispatch) => {
//         dispatch(loginUserAC(token))
//     }
// }
//
// export const logoutUser = () =>{
//     return (dispatch) => {
//         window.localStorage.removeItem('token');
//         dispatch(logoutUserAC())
//     }
// }

export default allUsersReducer;