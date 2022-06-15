import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {loginUserByToken} from "../redux/reducers/userReducer";
import axios from "axios";

const InitialAuth = () => {

    const dispatch = useDispatch()
    const token = localStorage.getItem('token');


    useEffect(() => {
        if (token) {
            // axios.defaults.headers.Authorization = `Bearer ${token}`;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            dispatch(loginUserByToken(token))
        }
    },[token])

};

export default InitialAuth;