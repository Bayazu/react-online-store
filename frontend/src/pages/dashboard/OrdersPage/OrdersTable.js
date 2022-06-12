import React, {useEffect, useState} from 'react';
import {InputAdornment, Paper, Table, TableBody, TableCell, TableRow} from "@mui/material";
import useTable from "../../../components/table/useTable";
import Toolbar from "@mui/material/Toolbar";
import Input from "../../../components/controls/Input";
import {Search} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";


import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import {usersAPI} from "../../../api/api";
import ActionAlert from "../../../components/alert/ActionAlert";
import Modal from "../../../components/modal/Modal";
import Register from "../../auth/Register";
// import ModalCreateUpdate from "./ModalCreate";
// import ModalCreate from "./ModalCreate";
// import ModalModify from "./ModalModify";
import AlertDialog from "../../../components/alert/AlertDialog";
import {useNavigate} from "react-router-dom";
import {getUsers} from "../../../redux/reducers/userReducer";
import {getAllOrders} from "../../../redux/reducers/ordersReducer";
import dayjs from "dayjs";
import MultipleSelectChip from "./MuiltiSelect";
import styled from "styled-components/macro";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '100%',
        marginRight: '10px'
    },
    // newButton: {
    //     position: 'absolute',
    //     right: '10px'
    // }
}))

const headCells = [
    {id: 'firstName', label: 'Имя'},
    {id: 'secondName', label: 'Фамилия'},
    {id: 'email', label: 'email'},
    {id: 'username', label: 'username'},
    {id: 'datePurchase', label: 'Дата покупки'},
    {id: 'summaryOrder', label: 'Стоимость заказа'},
    {id: 'statusOrder', label: 'Статус заказа'},
    // {id: 'country', label: 'Страна'},
    // {id: 'city', label: 'Город'},
    // {id: 'street', label: 'Улица'},
    // {id: 'building', label: 'Дом'},
    // {id: 'apartment', label: 'Квартира'},
    {id: 'actions', label: 'Действия'},
]

const OrdersTable = () => {

    const [modalCreateActive, setModalCreateActive] = useState(false)
    const [modalModifyActive, setModalModifyActive] = useState(false)
    const dispatch = useDispatch()
    const classes = useStyles();
    const [openAlert, setOpenAlert] = useState(false)
    const [userCreate, setUserCreate] = useState(false)
    const [userModifyAlert, setUserModifyAlert] = useState(false)
    const [userDataModify, setUserDataModify] = useState(false)
    const [openConfirmModal, setConfirmModal] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const navigate = useNavigate()
    const [statuses, setStatuses] = useState([]);

    const getData = () => {
        dispatch(getAllOrders()).then((response) => {
            setRecords(response.data)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const [records, setRecords] = useState(null)

    const [filterFn, setFilterFn] = useState({
        fn: items => {
            return items;
        }
    })
    const deleteUserByAdmin = (id) => {
        // setConfirmModal(true)
        // console.log(isDelete)
        usersAPI.deleteUserByAdmin(id).then(response => {
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
            // const foundItem = arr2.find((item2) => item2.status === item.status);
            // if (foundItem) {
            //     return { ...foundItem };
            // }
            // return item;
        });
    };


    useEffect(() => {
        console.log(statuses);
        setFilterFn({
            fn: items => {
                if (statuses.length === 0)
                    return items
                else {
                    return filterByStatus(items,statuses)
                }
            }
        })
    }, [statuses])


    const createUser = () => {
        setModalCreateActive(true)
    }

    const modifyUsers = (item) => {
        setModalModifyActive(true)
        setUserDataModify(item)
    }

    const createUserSubmit = (data) => {
        return usersAPI.createUser(data)
            .then(response => {
                if (response.status === 200) {
                    setUserCreate(true)
                    setModalCreateActive(false)
                    getData()
                    return response
                }
                if (response.status === 400) {
                }
            })
    }

    const modifyUserSubmit = (data) => {
        return usersAPI.modifyUser(data)
            .then(response => {
                if (response.status === 200) {
                    setUserModifyAlert(true)
                    setModalModifyActive(false)
                    getData()
                    return response
                }
                if (response.status === 400) {
                }
            })
    }

    const InputWrapper = styled.div`
      width: 25%;,
    margin-right: 10 px;
    `;
    const SelectWrapper = styled.div`
      margin-left: 10px;
    `;
    return (
        <>
            <Paper sx={{width: '1'}}>
                {/*<ActionAlert openAlert={openAlert} setOpenAlert={setOpenAlert} text={'Пользователь успешно удалён'}/>*/}
                {/*<ActionAlert openAlert={userCreate} setOpenAlert={setUserCreate} text={'Пользователь успешно создан'}/>*/}
                {/*<ActionAlert openAlert={userModifyAlert} setOpenAlert={setUserModifyAlert} text={'Пользователь успешно отредактирован'}/>*/}
                {/*<AlertDialog open={openConfirmModal} setOpen={setConfirmModal} setIsDelete={setIsDelete} text={'Вы уверены, что хотите удалить пользователя'}/>*/}
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

                    {/*<Button*/}
                    {/*    onClick={() => createUser()}*/}
                    {/*    startIcon={<AddIcon/>}*/}
                    {/*    variant='outlined'*/}
                    {/*    sx={{*/}
                    {/*        margin: 'spacing(0.5)',*/}
                    {/*        color: "#1976d2",*/}
                    {/*        position: 'absolute',*/}
                    {/*        right: '10px',*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Добавить пользователя*/}
                    {/*</Button>*/}

                </Toolbar>
                <TblContainer>
                    <Table>
                        <TblHead/>
                        <TableBody>
                            {recordsAfterPagingAndSorting() ? recordsAfterPagingAndSorting().map(item => (
                                    // <TableRow onClick={() => navigate(`/profileUser/${item._id}`)} key={item._id} sx={{cursor: 'pointer'}}>
                                    <TableRow key={item._id}>
                                        <TableCell>{item.clientInfo.firstName}</TableCell>
                                        <TableCell>{item.clientInfo.secondName}</TableCell>
                                        <TableCell>{item.clientInfo.email}</TableCell>
                                        <TableCell>{item.clientInfo.username}</TableCell>
                                        <TableCell>{dayjs(item.datePurchase).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{item.priceOrder + '₽'}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        {/*<TableCell>{item.country}</TableCell>*/}
                                        {/*<TableCell>{item.city}</TableCell>*/}
                                        {/*<TableCell>{item.street}</TableCell>*/}
                                        {/*<TableCell>{item.building}</TableCell>*/}
                                        {/*<TableCell>{item.apartment}</TableCell>*/}
                                        <TableCell>
                                            <Button
                                                sx={{color: '#4caf50', minWidth: 0,}}
                                                onClick={() => navigate(`/profileUser/${item._id}`)}
                                            >
                                                <EditOutlinedIcon fontSize='small'/>
                                            </Button>
                                            <Button
                                                onClick={() => deleteUserByAdmin(item._id)}
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

            {/*<Modal active={modalCreateActive} setActive={setModalCreateActive}>*/}
            {/*    <ModalCreate isModal={true} createUserSubmit={createUserSubmit}/>*/}
            {/*</Modal>*/}
            {/*<Modal active={modalModifyActive} setActive={setModalModifyActive}>*/}
            {/*    <ModalModify isModal={true} modifyUserSubmit={modifyUserSubmit} userDataModify={userDataModify}/>*/}
            {/*</Modal>*/}
        </>

    );
};

export default OrdersTable;