import React from "react";
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


const ProfileUser = () => {

    const {width} = useWindowDimensions();

    const changeResolution = width < 1214;

    return (
        <Container changeResolution={changeResolution}>
            <Half changeResolution={changeResolution}>
                <ClientForm/>
            </Half>
            <Half changeResolution={changeResolution}>
                <InnerWrapper>
                    <UserOrders changeResolution={changeResolution}/>
                </InnerWrapper>
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