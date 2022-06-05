import React, {useEffect, useState} from 'react';
import {Paper} from "@mui/material";
import styled from "styled-components/macro";
import {useDispatch} from "react-redux";
import Box from "@mui/material/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HeaderText from "../../../components/HeaderText";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const UserOrders = (props) => {


    const orders = [
        {
            price: 850,
            amount: 8,
            date: 'Суббота 24 февраля, 2022'
        },
        {
            price: 1250,
            amount: 12,
            date: 'Пятница 14 февраля, 2022'
        },
    ]

    return (

        <Paper sx={{padding: '5px', width: props.changeResolution ? null : '100%'}}>
            <HeaderText text={'Заказы пользователя'}/>
            {orders?.map(el => {
                return (
                    <Line>
                        <Box sx={{color: '#1b5e20', fontSize: 34, verticalAlign: 'medium'}}
                             component={AttachMoneyIcon}/>
                        <Products>
                            {el.amount} Продуктов в заказе,
                        </Products>

                        <OrderByData>
                            {el.date}
                        </OrderByData>
                        <ProductPrice>
                            {el.price + ' ₽'}
                        </ProductPrice>
                    </Line>

                )
            })}
        </Paper>
    );
};

const Line = styled.div`
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #e2e9ed;
  }

  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;

`;
const Products = styled.div`
  margin-left: 10px;
`;
const OrderByData = styled.div`
  margin-left: 10px;
`;
const ProductPrice = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: 800;
`;


export default UserOrders;