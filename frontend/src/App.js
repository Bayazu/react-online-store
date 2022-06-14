import InitialAuth from "./components/InitialAuth";
import React from "react";
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import AllProducts from "./pages/Items/AllProducts";
import Product from "./pages/Items/Product/Product";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AdminLogin from "./pages/auth/AdminLogin";
import Basket from "./pages/basket/Basket";
import Profile from "./pages/ProfileUser/Profile";
import LayoutsWithNavbar from "./LayoutsWithNavbar";
import ClientsPage from "./pages/dashboard/ClientsPage";
import ProductsPage from "./pages/dashboard/ProductsPage";
import OrdersPage from "./pages/dashboard/OrdersPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfileUser from "./pages/dashboard/clients/ProfileUser/ProfileUser";
import ProductEdit from "./pages/dashboard/products/ProductEdit";
import AdminProtectedRoutes from "./ProtectedRoutes/AdminProtectedRoutes";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import OrderProfile from "./pages/dashboard/ordersPage/orderProfile/OrderProfile";

const App = () => {

    return (
        <Provider store={store}>
            <InitialAuth/>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<AllProducts/>}/>
                    <Route path="/index.html" element={<AllProducts/>}/>
                    <Route path="/items/" element={<AllProducts/>}/>
                    <Route path="/product/:id" element={<Product/>}/>
                    <Route path="/register/" element={<Register/>}/>
                    <Route path="/login/" element={<Login/>}/>
                    <Route path="/admin/" element={<AdminLogin/>}/>

                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/basket/" element={<Basket/>}/>
                        <Route path="/profile/" element={<Profile/>}/>
                        <Route path="/orderProfile/:id" element={<OrderProfile/>}/>
                    </Route>

                    <Route element={<AdminProtectedRoutes/>}>
                        <Route path="/" element={<LayoutsWithNavbar/>}>
                            <Route path="/clients" element={<ClientsPage/>}/>
                            <Route path="/products" element={<ProductsPage/>}/>
                            <Route path="/orders" element={<OrdersPage/>}/>
                            <Route path="/dashboard" element={<DashboardPage/>}/>
                            <Route path="/orderProfile/:id" element={<OrderProfile/>}/>
                            <Route path="/profileUser/:id" element={<ProfileUser/>}/>
                            <Route path="/productEdit/:id" element={<ProductEdit/>}/>
                        </Route>
                    </Route>

                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
