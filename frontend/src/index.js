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
import Dashboard from "./pages/dashboard/ClientsPage";
import NavBar from "./components/navBar/NavBar";
import AllProducts from "./pages/Items/AllProducts";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import InitialAuth from "./components/InitialAuth";
import DashboardTabs from "./components/verticalTabs/DashboardTabs";


import ClientsPage from "./pages/dashboard/ClientsPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminLogin from "./pages/auth/AdminLogin";
import ProductsPage from "./pages/dashboard/ProductsPage";
import LayoutsWithNavbar from "./LayoutsWithNavbar";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfileUser from "./pages/ProfileUser/ProfileUser";
import Product from "./pages/Items/Product/Product";
import Basket from "./pages/Basket/Basket";



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

                <Route element={<ProtectedRoutes/>}>
                    <Route path="/" element={<LayoutsWithNavbar/>}>
                        <Route path="/clients" element={<ClientsPage/>}/>
                        <Route path="/products" element={<ProductsPage/>}/>
                        <Route path="/dashboard" element={<DashboardPage/>}/>
                        <Route path="/profileUser/:id" element={<ProfileUser/>}/>
                    </Route>
                </Route>

            </Routes>
            {/*</PageLayout>*/}
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);