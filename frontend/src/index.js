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


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <InitialAuth/>
            <NavBar/>
            {/*<PageLayout>*/}
                <Routes>
                    <Route path="/" element={<App/>}/>
                    {/*<Route path="dashboard" element={<Dashboard/>}/>*/}
                    <Route path="/dashboard/clients/" element={<ClientsPage/>}/>

                    <Route path="/items/" element={<Items/>}/>
                    <Route path="/register/" element={<Register/>}/>
                    <Route path="/login/" element={<Login/>}/>



                    {/*<Route path="admin" element={<AdminLogin/>}/>*/}
                </Routes>
            {/*</PageLayout>*/}
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);