import React from 'react';
import {Paper} from "@mui/material";
import styled from "styled-components/macro";
import Box from "@mui/material/Box";
import HeaderText from "../../../components/HeaderText";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const UserOrders = (props) => {

    const {
        userOrders
    } = props

    const navigate = useNavigate()
    const userRole = useSelector((state) => state.user.userRole)

    return (

        <Paper sx={{padding: '5px', width: props.changeResolution ? null : '100%'}}>
            <HeaderText text={userRole==='USER' ? 'Мои заказы' : 'Заказы пользователя'}/>
            {userOrders?.map(el => {
                return (
                    <Line onClick={() => {
                        navigate(`/orderProfileUser/${el._id}`)
                    }}>
                        <Box sx={{color: '#1b5e20', fontSize: 34, verticalAlign: 'medium'}}
                             component={AttachMoneyIcon}/>
                        <Products>
                            {el.products.length} Продукта в заказе,
                        </Products>
                        <OrderByData>
                            {dayjs(el?.datePurchase).format('DD.MM.YYYY')}
                        </OrderByData>
                        <ProductPrice>
                            {el.priceOrder + ' ₽'}
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