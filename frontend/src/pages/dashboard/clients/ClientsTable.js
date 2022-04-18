import React from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper
} from '@mui/material'
import styled from "styled-components/macro";

const tableData = [
    {
        'id': 1,
        'first_name': 'alex',
        'last_name': 'titov',
        'email': '222@mail.ru',
        'gender': 'Male',
        'id_addres': '182.12312.3122'
    },
    {
        'id': 2,
        'first_name': 'alex',
        'last_name': 'titov',
        'email': '222@mail.ru',
        'gender': 'Male',
        'id_addres': '182.12312.3122'
    },
    {
        'id': 3,
        'first_name': 'alex',
        'last_name': 'titov',
        'email': '222@mail.ru',
        'gender': 'Male',
        'id_addres': '182.12312.3122'
    },
]


const ClientsTable = () => {
    return (
        <Container>
        <TableContainer component={Paper}>
            <Table aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tableData.map(row => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell >{row.id}</TableCell>
                                <TableCell>{row.first_name}</TableCell>
                                <TableCell>{row.last_name}</TableCell>
                                <TableCell onClick={()=>console.log(row.email)}>{row.email}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        </Container>
    );
};

const Container = styled.div`
  max-width: 1600px;
`;

export default ClientsTable;