import styled from 'styled-components/macro'
import Items from "./pages/Items/Items";
import NavBar from "./components/navBar/NavBar";
import {useEffect, useState} from "react";
import {loginUser} from "./redux/reducers/userReducer";
import {useDispatch} from "react-redux";

const App = () => {


  return (
    <AppMain/>
  );
}

const AppMain = styled.div`

`;

export default App;
