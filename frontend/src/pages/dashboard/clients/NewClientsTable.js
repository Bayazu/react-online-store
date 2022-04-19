import React, {useEffect, useState} from 'react';
import {InputAdornment, Paper, Table, TableBody, TableCell, TableRow} from "@mui/material";
import useTable from "../../../components/table/useTable";
import Toolbar from "@mui/material/Toolbar";
import Input from "../../../components/controls/Input";
import {Search} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import allUsersReducer, {getUsers} from "../../../redux/reducers/allUsersReducer";

const NewClientsTable = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers()).then((response)=>{
            setRecords(response.data)
        })
    }, [])

    const [records, setRecords] = useState(null)
    const [filterFn, setFilterFn] = useState({
        fn: items => {
            return items;
        }
    })

    const headCells = [
        {id: '_id', label: '_id'},
        {id: 'firstName', label: 'Имя'},
        {id: 'secondName', label: 'Фамилия'},
        {id: 'email', label: 'email'},
        {id: 'country', label: 'Страна'},
        {id: 'city', label: 'Город'},
        {id: 'street', label : 'Улица'},
        {id: 'building', label : 'Дом'},
        {id: 'apartment', label : 'Квартира'},
        {id: 'role', label : 'Роль'},
    ]


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
        <Paper sx={{width: '1', padding: '15px'}}>
            <Toolbar>
                <Input
                    label='Поиск клиента по фамилии'
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search/>
                        </InputAdornment>)
                    }}
                    onChange={handleSearch}
                />
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
                                        <TableCell>{item.role}</TableCell>
                                    </TableRow>
                                ))
                            : null
                        }
                    </TableBody>
                </Table>
                <TblPagination/>
            </TblContainer>
        </Paper>


    );
};

export default NewClientsTable;