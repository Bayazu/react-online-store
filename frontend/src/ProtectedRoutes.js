import {Outlet} from 'react-router'
import Items from "./pages/Items/Items";
import {useSelector} from "react-redux";

const ProtectedRoutes = () =>{
    const userRole = useSelector((state) => state.user.userRole)
    const isAuth = useSelector((state) => state.user.isUserAuth)


    return ((isAuth && userRole === 'ADMIN')  ? <Outlet/> : <Items/>)
}

export default ProtectedRoutes

