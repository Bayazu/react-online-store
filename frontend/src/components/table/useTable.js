import React, {useState} from 'react';
import {Paper, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary.main,
            backgroundColor: '#eff5f8',
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#e2e9ed',
            // cursor: 'pointer',
            transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
    },
}))

export default function useTable(records, headCells, filterFn) {

    const classes = useStyles();

    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()


    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )


    const handleChangePage = (event,newPage) => {
        setPage(newPage)

    }
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const TblHead = props => {


        const handleSortRequest = cellId => {
            const isAsc = orderBy === cellId && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc')
            setOrderBy(cellId)
        }

        return (
            <TableHead>
                <TableRow sx={{background: '#eff5f8'}}>
                    {
                        headCells.map(headCell => (
                            <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
                                {headCell.disableSorting ? headCell.label :
                                    <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={orderBy === headCell.id ? order : 'asc'}
                                        onClick={() => {
                                            handleSortRequest(headCell.id)
                                        }}>
                                        {headCell.label}
                                    </TableSortLabel>
                                }
                            </TableCell>))
                    }
                </TableRow>
            </TableHead>
        )
    }


    const TblPagination = () => (<TablePagination
        component='div'
        count={records?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
    />)

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }


    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array?.map((el, index) => [el, index]);
        stabilizedThis?.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis?.map((el) => el[0]);
    }

    const recordsAfterPagingAndSorting = () => {
        //return filterFn(records).slice().sort(getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
        return stableSort(filterFn.fn(records), getComparator(order, orderBy))?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

    }

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
};

