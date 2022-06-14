import React, {useCallback, useEffect, useState} from 'react';
import {InputAdornment, Paper, Table, TableBody, TableCell, TableRow} from "@mui/material";
import useTable from "../../../components/table/useTable";
import Toolbar from "@mui/material/Toolbar";
import Input from "../../../components/controls/Input";
import {Search} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import ActionAlert from "../../../components/alert/ActionAlert";
import Modal from "../../../components/modal/Modal";
import AlertDialog from "../../../components/alert/AlertDialog";
import {useNavigate} from "react-router-dom";
import {getUsers} from "../../../redux/reducers/userReducer";
import ClientForm from "./ClientForm";
import {usersAPI} from "../../../api/usersAPi";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '25%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    {id: 'firstName', label: 'Имя'},
    {id: 'secondName', label: 'Фамилия'},
    {id: 'email', label: 'email'},
    {id: 'country', label: 'Страна'},
    {id: 'city', label: 'Город'},
    {id: 'street', label: 'Улица'},
    {id: 'building', label: 'Дом'},
    {id: 'apartment', label: 'Квартира'},
    {id: 'actions', label: 'Действия'},
]

const ClientsTable = () => {

    const [modalCreateActive, setModalCreateActive] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [userCreate, setUserCreate] = useState(false)
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const [userId, setUserId] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyles();

    const getData = useCallback(()=>{
        dispatch(getUsers()).then((response) => {
            setRecords(response.data)
        })
    },[])

    useEffect(() => {
        getData()
    }, [getData])


    const [records, setRecords] = useState(null)
    const [filterFn, setFilterFn] = useState({
        fn: items => {
            return items;
        }
    })

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
                    return items.filter(x => x.secondName?.toLowerCase().includes(target.value))
                }
            }
        })
    }

    const createUser = () => {
        setModalCreateActive(true)
    }

    const deleteUserByAdmin = () => {
        usersAPI.deleteUserByAdmin(userId).then(response => {
            if (response.status === 200) {
                setOpenAlert(true)
                getData()
            }
        })
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


    return (
        <>
            <Paper sx={{width: '1'}}>
                <ActionAlert openAlert={openAlert} setOpenAlert={setOpenAlert} text={'Пользователь успешно удалён'}/>
                <ActionAlert openAlert={userCreate} setOpenAlert={setUserCreate} text={'Пользователь успешно создан'}/>
                <AlertDialog
                    confirmAlert={deleteUserByAdmin}
                    open={openConfirmModal}
                    setOpen={setOpenConfirmModal}
                    text={'Вы уверены, что хотите удалить пользователя'}
                    title={'Удаление пользователя'}
                />
                <Toolbar sx={{marginTop: '10px'}}>
                    <Input
                        label='Поиск клиента по фамилии'
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search/>
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Button
                        onClick={() => createUser()}
                        startIcon={<AddIcon/>}
                        variant='outlined'
                        sx={{
                            margin: 'spacing(0.5)',
                            color: "#1976d2",
                            position: 'absolute',
                            right: '10px',
                        }}
                    >
                        Добавить пользователя
                    </Button>
                </Toolbar>
                <TblContainer>
                    <Table>
                        <TblHead/>
                        <TableBody>
                            {recordsAfterPagingAndSorting() ? recordsAfterPagingAndSorting().map(item => (
                                    <TableRow key={item._id}>
                                        <TableCell>{item.firstName}</TableCell>
                                        <TableCell>{item.secondName}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.country}</TableCell>
                                        <TableCell>{item.city}</TableCell>
                                        <TableCell>{item.street}</TableCell>
                                        <TableCell>{item.building}</TableCell>
                                        <TableCell>{item.apartment}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => navigate(`/profileUser/${item._id}`)}
                                                sx={{color: '#4caf50', minWidth: 0,}}
                                            >
                                                <EditOutlinedIcon fontSize='small'/>
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setOpenConfirmModal(true)
                                                    setUserId(item._id)
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

            <Modal active={modalCreateActive} setActive={setModalCreateActive}>
                <ClientForm createUserSubmit={createUserSubmit} isCreate={true}/>
            </Modal>
        </>

    );
};

export default ClientsTable;