import React, {useEffect, useState} from "react";
import ClientForm from "../dashboard/clients/ClientForm";
import UserOrders from "../dashboard/clients/UserOrders";
import InfoContainer from "../../components/InfoContainer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Orders from "../dashboard/dashboard/Orders";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import NewClients from "../dashboard/dashboard/NewClients";
import styled from "styled-components/macro";
import useWindowDimensions from "../../helpers/hooks/useWindowDimensions";
import {FUCK} from "./chart";
import {getUserById, loginUser, modifyUserById} from "../../redux/reducers/userReducer";
import {useDispatch} from "react-redux";
import ActionAlert from "../../components/alert/ActionAlert";


const ProfileUser = () => {

    const {width} = useWindowDimensions();
    const changeResolution = width < 1214;
    const [userData, setUserData] = useState(null)
    const dispatch = useDispatch()
    const [openAlert, setOpenAlert] = useState(false)

    useEffect(() => {
        dispatch(getUserById('629a157d091090fd743ac0d8')).then((response) => {
            setUserData(response.data)
        })
    }, [])

    const modifyUser = (data) => {
        console.log(data)
        let id = '629a157d091090fd743ac0d8'
        dispatch(modifyUserById(data, id)).then((response) => {
            console.log(response);
            setOpenAlert(true)
        })
    }


    return (
        <Container changeResolution={changeResolution}>
            <Half changeResolution={changeResolution}>
                <ClientForm userData={userData} modifyUser={modifyUser} openAlert={openAlert}
                            setOpenAlert={setOpenAlert}/>
            </Half>
            <Half changeResolution={changeResolution}>
                <InnerWrapper>
                    <UserOrders changeResolution={changeResolution}/>
                </InnerWrapper>
                {/*<InnerWrapper>*/}
                {/*    <FUCK/>*/}
                {/*</InnerWrapper>*/}
            </Half>
        </Container>
    )
};

const Container = styled.div`
  align-items: ${props => props.changeResolution ? 'center' : 'flex-start'};
  width: 100%;
  display: flex;
  flex-direction: ${props => props.changeResolution ? 'column' : 'row'};
`;
const Half = styled.div`
  flex-wrap: wrap;
  margin-right: 10px;
  margin-top: ${props => props.changeResolution && '5px'};
  width: ${props => props.changeResolution && '100%'};
  display: flex;
  flex-direction: ${props => props.changeResolution ? 'column' : 'row'};
`;
const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;


export default ProfileUser;