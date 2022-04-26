import {Outlet} from 'react-router'
import AllProducts from "./pages/Items/AllProducts";
import {useSelector} from "react-redux";

const ProtectedRoutes = () =>{
    const userRole = useSelector((state) => state.user.userRole)
    const isAuth = useSelector((state) => state.user.isUserAuth)


    return ((isAuth && userRole === 'ADMIN')  ? <Outlet/> : <AllProducts/>)
}

export default ProtectedRoutes

