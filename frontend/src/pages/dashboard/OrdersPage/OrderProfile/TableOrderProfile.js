import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CardMedia from "@mui/material/CardMedia";
import {backEndUrl} from "../../../../constants";
import styled from "styled-components/macro";


export default function TableOrderProfile(props) {
    const {
        orderData,
    } = props

    const productsInOrder = orderData?.products

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow align='center'>
                        <TableCell align='center'></TableCell>
                        <TableCell align='center'>Наименование товара</TableCell>
                        <TableCell align='center'>Количество товара в заказе</TableCell>
                        <TableCell align='center'>Цена товара</TableCell>
                        <TableCell align='center'>Тег</TableCell>
                        <TableCell align='center'>Итоговая стоимость</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productsInOrder?.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align='center' component="th" scope="row">
                                <CardWrapper>
                                    <CardContainer>
                                        <CardMedia
                                            component="img"
                                            maxHeight="50"
                                            maxWidth="50"
                                            image={backEndUrl + row.image}
                                        />
                                    </CardContainer>
                                </CardWrapper>
                            </TableCell>
                            <TableCell align='center' component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align='center'>{row.amount}</TableCell>
                            <TableCell align='center'>{row.price}</TableCell>
                            <TableCell align='center'>{row.tag}</TableCell>
                            <TableCell align='center'>{row.priceInTotal} ₽</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
const CardContainer = styled.div`
  max-Width: 50px;
  display: flex;
`;
const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
