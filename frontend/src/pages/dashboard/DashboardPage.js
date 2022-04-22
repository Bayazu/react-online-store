import React, {useEffect, useState} from 'react';
import ProductsTable from "./products/ProductsTable";
import ClientsTable from "./clients/ClientsTable";
import styled from "styled-components/macro";
import HeaderComponent from "../../components/InfoContainer";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useWindowDimensions from "../../helpers/hooks/useWindowDimensions";
import InfoContainer from "../../components/InfoContainer";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import NewClients from "./dashboard/NewClients";
import Orders from "./dashboard/Orders";


const DashboardPage = () => {

    const { width } = useWindowDimensions();

    const changeResolution = width < 1214;

    return (
        <Container changeResolution={changeResolution}>
            <Half changeResolution={changeResolution}>
                <InfoContainer  headerText={'Стоимость покупок за месяц'} textSecondary={'1300 Рублей'} Icon={AttachMoneyIcon}/>
                <InfoContainer  headerText={'Количество заказов за месяц'} textSecondary={'2 Покупок'} Icon={ShoppingCartIcon}/>
                <Orders changeResolution={changeResolution}/>
            </Half>
            <Half changeResolution={changeResolution}>
                <InnerWrapper>
                    <InfoContainer headerText={'Новых пользователей зарегестрировано сегодня'} textSecondary={'12'} Icon={PersonAddAltIcon}/>
                    <NewClients/>
                </InnerWrapper>
            </Half>
        </Container>
    );
};


const Half = styled.div`
  flex-wrap: wrap;
  width: ${props => props.changeResolution ? '100%' : '50%'};
  display: flex;
  flex-direction: ${props => props.changeResolution ? 'column' : 'row'};
`;

const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const RightHalf = styled.div`
  display: flex;
`;
const Container = styled.div`
  align-items: ${props => props.changeResolution ? 'center' : 'flex-start'};
  width: 100%;
  display: flex;
  flex-direction: ${props => props.changeResolution ? 'column' : 'row'};


  // display: flex;
   
`;
const InnerContainer = styled.div`
  background: blue;
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;




export default DashboardPage;
