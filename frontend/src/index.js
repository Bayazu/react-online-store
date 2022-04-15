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
import Dashboard from "./pages/dashboard/dashboard";
import NavBar from "./components/navBar/NavBar";
import Items from "./pages/Items/Items";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import InitialAuth from "./components/InitialAuth";


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <InitialAuth/>
            <NavBar/>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="items" element={<Items/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);