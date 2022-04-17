import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {loginUser, loginUserByToken} from "../redux/reducers/userReducer";
import axios from "axios";

const InitialAuth = () => {

    const dispatch = useDispatch()
    const token = localStorage.getItem('token');


    useEffect(() => {
        if (token) {
            axios.defaults.headers.Authorization = `Bearer ${token}`;
            dispatch(loginUserByToken(token))
        }
    },[token])


    return (
        <div>

        </div>
    );
};

export default InitialAuth;