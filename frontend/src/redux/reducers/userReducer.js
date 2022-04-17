import {usersAPI} from "../../api/api";

const LOGIN_USER = 'LOGIN_USER'
const CREATE_USER = 'CREATE_USER'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const LOGOUT_USER = 'LOGOUT_USER'

let initialState = {
    token: null,
    isUserAuth : false,
    isFetching: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                token: action.token,
                isUserAuth: true,
            }
        case LOGOUT_USER:
            return {
                ...state,
                token: null,
                isUserAuth: false,
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

export const loginUserAC = (token) => ({type: LOGIN_USER, token: token})
export const logoutUserAC = () => ({type: LOGOUT_USER})
export const createNewUser = (data) => ({type: CREATE_USER, data: data})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})


export const loginUser = (data) =>{
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        return usersAPI.loginUser(data).then((response)=>{
                if(response?.status === 200){
                    const token = response.data.token;
                    dispatch(loginUserAC(token))
                    window.localStorage.setItem('token', token)
                    dispatch(toggleIsFetching(false));
                    return response
                }
                return response
        })
    }
}
export const loginUserByToken = (token) =>{
    return (dispatch) => {
        dispatch(loginUserAC(token))
    }
}

export const logoutUser = () =>{
    return (dispatch) => {
        window.localStorage.removeItem('token');
        dispatch(logoutUserAC())
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