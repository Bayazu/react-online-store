import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";
import {useParams} from "react-router";
import Box from "@mui/material/Box";
import useWindowDimensions from "../../../../helpers/hooks/useWindowDimensions";
import OrderInfo from "./OrderInfo";
import InfoContainer from "../../../../components/InfoContainer";
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import dayjs from "dayjs";
import {ordersAPI} from "../../../../api/ordersAPI";


const OrderProfile = () => {

    const {width} = useWindowDimensions();
    const changeResolution = width < 1214;
    const [orderData, setOrderData] = useState(null)
    const [openAlert, setOpenAlert] = useState(false)
    const [currentStatus, setCurrentStatus] = useState([]);

    const params = useParams()
    const orderId = params.id

    useEffect(() => {
        ordersAPI.getOrderById(orderId).then((response) => {
            setOrderData(response.data)
            setCurrentStatus(response.data.status)
        })
    }, [orderId])

    const changeStatus = () => {
        ordersAPI.changeStatusOrder(orderId,currentStatus).then((response)=>{
            if(response.status === 200){
                setOpenAlert(true)
            }
        })
    }


    return (
        <Container changeResolution={changeResolution}>
            <Box sx={{display: 'flex'}}>
                <Half changeResolution={changeResolution}>
                    <OrderInfo
                        openAlert={openAlert}
                        setOpenAlert={setOpenAlert}
                        orderData={orderData}
                        currentStatus={currentStatus}
                        setCurrentStatus={setCurrentStatus}
                        changeStatus={changeStatus}
                    />
                </Half>
                <Half changeResolution={changeResolution}>
                    <InnerWrapper>
                        <InfoContainer
                            width='360px'
                            headerText={'Итоговая стоимость заказа'}
                            textSecondary={orderData?.priceOrder + ' ₽'}
                            Icon={CurrencyRubleIcon}/>
                        <InfoContainer
                            width='360px'
                            headerText={'Дата создания заказа'}
                            textSecondary={dayjs(orderData?.datePurchase).format('DD.MM.YYYY')}
                            Icon={CalendarMonthIcon}/>
                        <InfoContainer
                            width='360px'
                            headerText={'Адрес клиента'}
                            // textSecondary={'12'}
                            clientAddress={orderData?.clientAddress}
                            fontSize='20'
                            bigData={true}
                            Icon={HomeIcon}/>
                        <InfoContainer
                            clientInfo={orderData?.clientInfo}
                            fontSize='20'
                            width='360px'
                            headerText={'Личные данные клиента'}
                            // textSecondary={'12'}
                            bigData={true}
                            Icon={AccountBoxIcon}/>

                    </InnerWrapper>
                    {/*<InnerWrapper>*/}
                    {/*    <UserOrders changeResolution={changeResolution}/>*/}
                    {/*</InnerWrapper>*/}
                    {/*<InnerWrapper>*/}
                    {/*    <FUCK/>*/}
                    {/*</InnerWrapper>*/}
                </Half>
        </Box>

        </Container>
    )
};

// const StatusWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 8px 6px 0 0;
//   align-items: center;
// `;

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
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  display: flex;
  //flex-direction: column;
`;


export default OrderProfile;