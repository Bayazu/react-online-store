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
import AlertDialog from "../../../components/alert/AlertDialog";
import {useNavigate} from "react-router-dom";

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
    {id: 'tag', label: 'Тэг'},
    {id: 'image', label: 'Картинка'},
    {id: 'actions', label: 'Действия'},
]

const ProductsTable = () => {

    const dispatch = useDispatch()
    const [openAlert, setOpenAlert] = useState(false)
    const [openCreateAlert, setOpenCreateAlert] = useState(false)
    const classes = useStyles();
    const navigate = useNavigate()
    const [modalCreateActive, setModalCreateActive] = useState(false)
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const [productId, setProductId] = useState(null)
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
    const deleteProduct = () => {
        itemsAPI.deleteProduct(productId).then(response => {
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
                    return items.filter(x => x.name?.toLowerCase().includes(target.value))
                }
            }
        })
    }



    const createNewItem = (data) => {
        const itemData = new FormData()
        itemData.append('image', data.image)
        itemData.append('name', data.name)
        itemData.append('description', data.description)
        itemData.append('price', data.price)
        itemData.append('tag', data.tag)
        return dispatch(createNewProduct(itemData)).then((response) => {
            if (response.status === 200) {
                setOpenCreateAlert(true)
                setModalCreateActive(false)
                getData()
                return response
            }
        })
    }

    return (
        <>
            <Paper sx={{width: '1'}}>
                <ActionAlert openAlert={openAlert} setOpenAlert={setOpenAlert} text={'Товар успешно удалён'}/>
                <ActionAlert openAlert={openCreateAlert} setOpenAlert={setOpenCreateAlert}
                             text={'Товар успешно создан'}/>
                <AlertDialog
                    confirmAlert={deleteProduct}
                    open={openConfirmModal}
                    setOpen={setOpenConfirmModal}
                    text={'Вы уверены, что хотите удалить пользователя'}
                    title={'Удаление пользователя'}
                />
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
                        onClick={() => setModalCreateActive(true)}
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
                                    <TableRow key={item._id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.price}</TableCell>
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
                                            <Button onClick={()=>navigate(`/productEdit/${item._id}`)} sx={{color: '#4caf50', minWidth: 0,}}>
                                                <EditOutlinedIcon fontSize='small'/>
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setOpenConfirmModal(true)
                                                    setProductId(item._id)
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
                <ProductForm createNewItem={createNewItem} isCreate={true}/>
            </Modal>
        </>
    );
};

export default ProductsTable;