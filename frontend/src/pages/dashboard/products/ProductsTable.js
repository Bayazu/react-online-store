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
import {createNewProduct, getItems} from "../../../redux/reducers/itemsReducer";
import CardMedia from "@mui/material/CardMedia";
import {backEndUrl} from "../../../constants";
import ActionAlert from "../../../components/alert/ActionAlert";
import {itemsAPI, usersAPI} from "../../../api/api";
import ClientForm from "../clients/ClientForm";
import Modal from "../../../components/modal/Modal";
import ProductForm from "./ProductForm";

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
    {id: 'name', label: 'Наименование'},
    {id: 'description', label: 'Описание'},
    {id: 'price', label: 'Цена'},
    {id: 'amount', label: 'Остаток'},
    {id: 'tag', label: 'Тэг'},
    {id: 'image', label: 'Картинка'},
    {id: 'actions', label: 'Действия'},
]

const ProductsTable = () => {

    const dispatch = useDispatch()
    const [openAlert, setOpenAlert] = useState(false)
    const classes = useStyles();

    const [modalCreateActive, setModalCreateActive] = useState(true)
    //const items = useSelector((state) => state.itemsPage.items)


    const getData = () => {
        dispatch(getItems()).then((response) => {
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
    const deleteProduct = (id) => {
        itemsAPI.deleteProduct(id).then(response => {
            if (response.status === 200) {
                setOpenAlert(true)
                getData()
            }
        })
        setOpenAlert(true)
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
                    return items.filter(x => x.name?.toLowerCase().includes(target.value))
                }
            }
        })
    }

    const [fuck, setFuck] = useState(null)

    const createNewItem = (data) => {
        console.log(data);
        const itemData = new FormData()
        // name: '',
        //     description: '',
        //     price: '',
        //     tag: '',
        //     image: ''
        itemData.append('image',data.image)
        itemData.append('name',data.name)
        itemData.append('description',data.description)
        itemData.append('price',data.price)
        itemData.append('tag',data.tag)
        console.log(itemData);
        dispatch(createNewProduct(itemData)).then((response) => {
            setFuck(response.data)
        })
    }

    console.log(fuck);


    return (
        <>
            <Paper sx={{width: '1'}}>
                <ActionAlert openAlert={openAlert} setOpenAlert={setOpenAlert} text={'Товар успешно удалён'}/>
                <Toolbar sx={{marginTop: '10px'}}>
                    <Input
                        label='Поиск товара'
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
                        Добавить товар
                    </Button>

                </Toolbar>
                <TblContainer>
                    <Table>
                        <TblHead/>
                        <TableBody>
                            {recordsAfterPagingAndSorting() ? recordsAfterPagingAndSorting().map(item => (
                                    <TableRow key={item._id} sx={{cursor: 'pointer'}}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.amount}</TableCell>
                                        <TableCell>{item.tag}</TableCell>
                                        {/*<TableCell>{item.image}</TableCell>*/}
                                        <TableCell>
                                            <CardMedia
                                                component="img"
                                                height="60"
                                                //image={item.image ? item.image : adminAvatarSrc}
                                                image={backEndUrl + item.image}
                                                alt="green iguana"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button sx={{color: '#4caf50', minWidth: 0,}}>
                                                <EditOutlinedIcon fontSize='small'/>
                                            </Button>
                                            <Button
                                                onClick={() => deleteProduct(item._id)}
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
                <ProductForm createNewItem={createNewItem}  isCreate={true}/>
            </Modal>
        </>
    );
};

export default ProductsTable;