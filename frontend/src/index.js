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
import Items from "./pages/Items/Items";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import InitialAuth from "./components/InitialAuth";
import DashboardTabs from "./components/verticalTabs/DashboardTabs";


import ClientsPage from "./pages/dashboard/ClientsPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminLogin from "./pages/auth/AdminLogin";
import ProductsPage from "./pages/dashboard/ProductsPage";
import LayoutsWithNavbar from "./LayoutsWithNavbar";


ReactDOM.render(
    <Provider store={store}>
        <InitialAuth/>
        <BrowserRouter>
            <NavBar/>
            {/*<PageLayout>*/}
            <Routes>
                <Route path="/" element={<App/>}/>
                {/*<Route path="dashboard" element={<Dashboard/>}/>*/}
                <Route path="/items/" element={<Items/>}/>
                <Route path="/register/" element={<Register/>}/>
                <Route path="/login/" element={<Login/>}/>
                <Route path="/admin/" element={<AdminLogin/>}/>

                <Route element={<ProtectedRoutes/>}>
                    <Route path="/" element={<LayoutsWithNavbar/>}>
                        <Route path="/clients" element={<ClientsPage/>}/>
                        <Route path="/products" element={<ProductsPage/>}/>
                    </Route>
                </Route>

            </Routes>
            {/*</PageLayout>*/}
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);