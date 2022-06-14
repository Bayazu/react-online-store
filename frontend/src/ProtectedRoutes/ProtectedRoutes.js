import {Outlet} from 'react-router'
import AllProducts from "../pages/Items/AllProducts";
import {useSelector} from "react-redux";
import React from "react";

const ProtectedRoutes = () =>{
    const isAuth = useSelector((state) => state.user.isUserAuth)


    return ((isAuth)  ? <Outlet/> : <AllProducts/>)
}

export default ProtectedRoutes

