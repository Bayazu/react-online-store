import React, {useEffect, useState} from 'react';
import {InputAdornment, Paper, Table, TableBody, TableCell, TableRow} from "@mui/material";
import useTable from "../../../components/table/useTable";
import Toolbar from "@mui/material/Toolbar";
import Input from "../../../components/controls/Input";
import {Search} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import allUsersReducer, {getUsers} from "../../../redux/reducers/allUsersReducer";

import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import {usersAPI} from "../../../api/api";
import ActionAlert from "../../../components/alert/ActionAlert";

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
    {id: '_id', label: '_id'},
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

const NewClientsTable = () => {

    const dispatch = useDispatch()

    const classes = useStyles();

    const [openAlert, setOpenAlert] = useState(false)

    const getData = () => {
        dispatch(getUsers()).then((response) => {
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
        usersAPI.deleteUserByAdmin(id).then(response =>{
            if(response.status === 200){
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
                    return items.filter(x => x.secondName?.toLowerCase().includes(target.value))
                }
            }
        })
    }


    return (
        <>
            <Paper sx={{width: '1'}}>
                <ActionAlert openAlert={openAlert} setOpenAlert={setOpenAlert}/>
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
                                    <TableRow key={item._id} sx={{cursor: 'pointer'}}>
                                        <TableCell>{item._id}</TableCell>
                                        <TableCell>{item.firstName}</TableCell>
                                        <TableCell>{item.secondName}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.country}</TableCell>
                                        <TableCell>{item.city}</TableCell>
                                        <TableCell>{item.street}</TableCell>
                                        <TableCell>{item.building}</TableCell>
                                        <TableCell>{item.apartment}</TableCell>
                                        <TableCell>
                                            <Button sx={{color: '#4caf50', minWidth: 0,}}>
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
        </>

    );
};

export default NewClientsTable;