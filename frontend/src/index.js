import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {Provider} from 'react-redux'
import store from './redux/store'
import NavBar from "./components/navBar/NavBar";
import AllProducts from "./pages/Items/AllProducts";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import InitialAuth from "./components/InitialAuth";
import ClientsPage from "./pages/dashboard/ClientsPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminLogin from "./pages/auth/AdminLogin";
import ProductsPage from "./pages/dashboard/ProductsPage";
import LayoutsWithNavbar from "./LayoutsWithNavbar";
import DashboardPage from "./pages/dashboard/DashboardPage";
import Product from "./pages/Items/Product/Product";
import Basket from "./pages/Basket/Basket";
import ProfileUser from "./pages/dashboard/clients/ProfileUser/ProfileUser";
import Profile from "./pages/ProfileUser/Profile";
import OrdersPage from "./pages/dashboard/OrdersPage";
import ProductEdit from "./pages/dashboard/products/ProductEdit";
import OrderProfile from "./pages/dashboard/OrdersPage/OrderProfile/OrderProfile";



ReactDOM.render(
    <Provider store={store}>
        <InitialAuth/>
        <BrowserRouter>
            <NavBar/>
            {/*<PageLayout>*/}
            <Routes>
                <Route path="/" element={<App/>}/>
                {/*<Route path="dashboard" element={<Dashboard/>}/>*/}
                <Route path="/items/" element={<AllProducts/>}/>
                <Route path="/product/:id" element={<Product/>}/>
                <Route path="/register/" element={<Register/>}/>
                <Route path="/login/" element={<Login/>}/>
                <Route path="/admin/" element={<AdminLogin/>}/>
                <Route path="/basket/" element={<Basket/>}/>
                <Route path="/profile/" element={<Profile/>}/>

                <Route element={<ProtectedRoutes/>}>
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
            {/*</PageLayout>*/}
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);