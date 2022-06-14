import React, {useCallback, useEffect, useState} from 'react';
import {InputAdornment, Paper, Table, TableBody, TableCell, TableRow} from "@mui/material";
import useTable from "../../../components/table/useTable";
import Toolbar from "@mui/material/Toolbar";
import Input from "../../../components/controls/Input";
import {Search} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import ActionAlert from "../../../components/alert/ActionAlert";
import AlertDialog from "../../../components/alert/AlertDialog";
import {useNavigate} from "react-router-dom";
import {getAllOrders} from "../../../redux/reducers/ordersReducer";
import dayjs from "dayjs";
import MultipleSelectChip from "./MuiltiSelect";
import styled from "styled-components/macro";
import {ordersAPI} from "../../../api/ordersAPI";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '100%',
        marginRight: '10px'
    },
}))

const headCells = [
    {id: 'firstName', label: 'Имя'},
    {id: 'secondName', label: 'Фамилия'},
    {id: 'email', label: 'email'},
    {id: 'username', label: 'username'},
    {id: 'datePurchase', label: 'Дата покупки'},
    {id: 'summaryOrder', label: 'Стоимость заказа'},
    {id: 'statusOrder', label: 'Статус заказа'},
    {id: 'actions', label: 'Действия'},
]

const OrdersTable = () => {


    const dispatch = useDispatch()
    const classes = useStyles();
    const [openAlert, setOpenAlert] = useState(false)
    const navigate = useNavigate()
    const [statuses, setStatuses] = useState([]);
    const [orderId, setOrderId] = useState(null)
    const [openConfirmModal, setOpenConfirmModal] = useState(false)

    const getData = useCallback(() => {
        dispatch(getAllOrders()).then((response) => {
            setRecords(response.data)
        })
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    const [records, setRecords] = useState(null)

    const [filterFn, setFilterFn] = useState({
        fn: items => {
            return items;
        }
    })
    const deleteOrder = () => {
        ordersAPI.deleteOrder(orderId).then(response => {
            if (response.status === 200) {
                setOpenAlert(true)
                getData()
            }
        })

    }
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn)

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items
                else {
                    return items.filter(x => x?.clientInfo?.email.toLowerCase().includes(target.value))
                }
            }
        })
    }

    const filterByStatus = (arr1, statuses) => {
        return arr1.filter((item) => {
            const foundItem = statuses.find((status) => status === item.status)
            if (foundItem) {
                return item
            }
        });
    };

    useEffect(() => {
        setFilterFn({
            fn: items => {
                if (statuses.length === 0)
                    return items
                else {
                    return filterByStatus(items, statuses)
                }
            }
        })
    }, [statuses])

    const navigateToOrderProfile = (orderData) => {
        navigate(`/orderProfile/${orderData._id}`)
    }

    return (
        <>
            <Paper sx={{width: '1'}}>
                <ActionAlert openAlert={openAlert} setOpenAlert={setOpenAlert} text={'Заказ успешно удалён'}/>
                <AlertDialog
                    confirmAlert={deleteOrder}
                    open={openConfirmModal}
                    setOpen={setOpenConfirmModal}
                    text={'Вы уверены, что хотите удалить заказ'}
                    title={'Удаление заказ'}
                />
                <Toolbar sx={{marginTop: '10px'}}>
                    <InputWrapper>
                        <Input
                            label='Поиск заказа по email клиента'
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>)
                            }}
                            onChange={handleSearch}
                        />
                    </InputWrapper>
                    <SelectWrapper>
                        <MultipleSelectChip statuses={statuses} setStatuses={setStatuses}/>
                    </SelectWrapper>
                </Toolbar>
                <TblContainer>
                    <Table>
                        <TblHead/>
                        <TableBody>
                            {recordsAfterPagingAndSorting() ? recordsAfterPagingAndSorting().map(item => (
                                    <TableRow key={item._id}>
                                        <TableCell>{item.clientInfo.firstName}</TableCell>
                                        <TableCell>{item.clientInfo.secondName}</TableCell>
                                        <TableCell>{item.clientInfo.email}</TableCell>
                                        <TableCell>{item.clientInfo.username}</TableCell>
                                        <TableCell>{dayjs(item.datePurchase).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{item.priceOrder + '₽'}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>
                                            <Button
                                                sx={{color: '#4caf50', minWidth: 0,}}
                                                onClick={() => navigateToOrderProfile(item)}
                                            >
                                                <EditOutlinedIcon fontSize='small'/>
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setOpenConfirmModal(true)
                                                    setOrderId(item._id)
                                                }}
                                                sx={{color: '#ef5350', minWidth: 0}}
                                            >
                                                <CloseIcon fontSize='small'/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : null
                            }
                        </TableBody>
                    </Table>
                    <TblPagination/>
                </TblContainer>
            </Paper>
        </>

    );
};

const InputWrapper = styled.div`
  width: 25%;,
  margin-right: 10px;
`;
const SelectWrapper = styled.div`
  margin-left: 10px;
`;

export default OrdersTable;