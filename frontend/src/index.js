import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store'
import Dashboard from "./pages/Items/dashboard/dashboard";
import NavBar from "./components/navBar/NavBar";
import Items from "./pages/Items/Items";



ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="dashboard" element={<Dashboard/>} />
                <Route path="items" element={<Items/>} />
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);