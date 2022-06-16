import React, {useEffect, useMemo, useState} from 'react';
import styled from "styled-components/macro";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useWindowDimensions from "../../helpers/hooks/useWindowDimensions";
import InfoContainer from "../../components/InfoContainer";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import NewClients from "./dashboard/NewClients";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import TableOrdersInfo from "./dashboard/TableOrdersInfo";
import {usersAPI} from "../../api/usersAPi";
import {ordersAPI} from "../../api/ordersAPI";
import {LineChart} from "./dashboard/charts/LineChart";
import {chartsAPI} from "../../api/chartsAPI";
import dayjs from "dayjs";
import 'dayjs/locale/ru';


const DashboardPage = () => {

    const [sumForMonth, setSumForMonth] = useState(null)
    const [orderForMonth, setOrderForMonth] = useState(null)
    const [newUsersForWeek, setNewUsersForWeek] = useState(null)
    const [chartOrdersForYear, setChartOrdersForYear] = useState(null)
    const {width} = useWindowDimensions();
    const changeResolution = width < 1214;

    useEffect(() => {
        ordersAPI.getOrdersSumForMonth().then((response) => {
            setSumForMonth(response.data)
        })
        ordersAPI.getOrdersForMonth().then((response) => {
            setOrderForMonth(response.data)
        })
        usersAPI.getUsersByWeek().then((response) => {
            setNewUsersForWeek(response.data)
        })
        chartsAPI.getOrdersChartForYear().then((response) => {
            setChartOrdersForYear(response.data)
        })

    }, [])

    const chartFormattedDataByIncome = useMemo(() => {
        const chartNames = ['Месяц', 'Доход', {role: "tooltip", type: "string", p: {html: true}}]
        const dataFormatted = chartOrdersForYear?.map((data1) => {
            return [data1[0], data1[2], dayjs(data1[0]).locale('ru').format('MMMM')]
        })
        let formattedDataForChart = [];
        if (dataFormatted) {
            formattedDataForChart = [chartNames, ...dataFormatted]
        }
        return formattedDataForChart
    }, [chartOrdersForYear]);

    const chartFormattedDataByOrder = useMemo(() => {
        const chartNames = ['Месяц', 'Заказы', {role: "tooltip", type: "string", p: {html: true}}]
        const dataFormatted = chartOrdersForYear?.map((data1) => {
            return [data1[0], data1[1], dayjs(data1[0]).locale('ru').format('MMMM')]
        })
        let formattedDataForChart = [];
        if (dataFormatted) {
            formattedDataForChart = [chartNames, ...dataFormatted]
        }
        return formattedDataForChart
    }, [chartOrdersForYear]);



    return (
        <Container changeResolution={changeResolution}>
            <Half changeResolution={changeResolution}>
                <InfoContainer headerText={'Стоимость покупок за месяц'} textSecondary={sumForMonth + ' ₽'}
                               Icon={CurrencyRubleIcon}/>
                <InfoContainer headerText={'Количество заказов за месяц'}
                               textSecondary={orderForMonth?.length + ' Заказа'} Icon={ShoppingCartIcon}/>
                <TableOrdersInfo orderData={orderForMonth}/>


            </Half>
            <Half changeResolution={changeResolution} noWrap={true}>
                <InnerWrapper>
                    <InfoContainer headerText={'Новых пользователей зарегистрировано за неделю'}
                                   textSecondary={newUsersForWeek?.length}
                                   Icon={PersonAddAltIcon}/>
                    <NewClients newUsersForWeek={newUsersForWeek}/>
                </InnerWrapper>
                <InnerWrapper width={'55%'} padding={'5px'}>
                    <LineChart data={chartFormattedDataByIncome} title='Доходность покупок за год'/>
                    <LineChart data={chartFormattedDataByOrder} title='Количество покупок за год'/>
                </InnerWrapper>
                {/*<InnerWrapper width={'55%'} padding={'5px'}>*/}
                {/*    <LineChart data={chartOrdersForYear}/>*/}
                {/*</InnerWrapper>*/}
            </Half>
        </Container>
    );
};


const Half = styled.div`
  //flex-wrap: wrap;
  flex-wrap: ${props => props.noWrap ? 'noWrap' : 'wrap'};
  width: ${props => props.changeResolution ? '100%' : '40%'};
  display: flex;
  flex-direction: ${props => props.changeResolution ? 'column' : 'row'};
`;

const InnerWrapper = styled.div`
  //width: 100%;
    //padding: ${props => props.padding ? props.padding : '0'};
  min-Width: ${props => props.width ? props.width : '45%'};
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
`;
const InnerContainer = styled.div`
  background: blue;
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;


export default DashboardPage;
