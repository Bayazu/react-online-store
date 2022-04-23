import React, {useEffect, useState} from 'react';
import {Paper} from "@mui/material";
import {getUsers} from "../../../redux/reducers/allUsersReducer";
import styled from "styled-components/macro";
import {useDispatch} from "react-redux";
import Box from "@mui/material/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HeaderText from "../../../components/HeaderText";

const Orders = (props) => {

   const orders = [
       {
           price : 100,
           clientName : 'alex titov'
       },
       {
           price : 250,
           clientName : 'artur caturyan'
       },
       {
           price : 300,
           clientName : 'oleg lenin'
       },
       {
           price : 100,
           clientName : 'alex titov'
       },
       {
           price : 250,
           clientName : 'artur caturyan'
       },
       {
           price : 300,
           clientName : 'oleg lenin'
       }
   ]

    return (


        <Paper sx={{margin: '5px', padding: '5px', marginTop: '-10px', boxShadow: '0px -1px #c3c3c3', width: props.changeResolution ? null : '100%' }}>
            <HeaderText text={'Оплаченные заказы'}/>
            {orders?.map(el=>{
                return(
                    <Line>
                        <Box sx={{color: '#1976d2', fontSize: 54, verticalAlign: 'medium'}} component={AccountCircleIcon}/>
                        <ClientName>
                            {el.clientName}
                        </ClientName>
                        <OrderByData>
                            18/04/2202
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

`;
const ClientName = styled.div`
    margin-left: 10px;
`;
const OrderByData = styled.div`
   margin-left: 10px;
`;
const ProductPrice = styled.div`
    margin-left: auto;
    margin-right: 10px;
`;


export default Orders;