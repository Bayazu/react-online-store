import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from "styled-components/macro";
import {makeStyles} from "@material-ui/core/styles";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    table: {
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary.main,
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#e2e9ed',
            cursor: 'pointer',
            transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
    },
}))



export default function TableOrdersInfo(props) {
    const {
        orderData,
    } = props

    const classes = useStyles();

    let navigate = useNavigate();

    return (
        <TableContainer component={Paper} className={classes.table} sx={{maxWidth: '800px'}}>
            <Table sx={{minWidth: 450,}} aria-label="simple table">
                <TableHead>
                    <TableRow align='center'>
                        <TableCell align='center'>E-mail</TableCell>
                        <TableCell align='center'>username</TableCell>
                        <TableCell align='center'>фамилия</TableCell>
                        <TableCell align='center'>Дата создания заказа</TableCell>
                        <TableCell align='center'>Итоговая стоимость</TableCell>
                        <TableCell align='center'>Статус</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderData?.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            onClick={()=> navigate(`/orderProfile/${row._id}`)}
                        >
                            <TableCell align='center' component="th" scope="row">
                                {row.clientInfo.email}
                            </TableCell>
                            <TableCell align='center' component="th" scope="row">
                                {row.clientInfo.username}
                            </TableCell>
                            <TableCell align='center'>{row.clientInfo.secondName}</TableCell>
                            <TableCell align='center'>{dayjs(row.datePurchase).format('DD.MM.YYYY')}</TableCell>
                            <TableCell align='center'>{row.priceOrder} ₽</TableCell>
                            <TableCell align='center'>{row.status}</TableCell>
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
