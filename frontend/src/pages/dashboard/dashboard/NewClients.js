import React, {useEffect, useState} from 'react';
import {Paper} from "@mui/material";
import {getUsers} from "../../../redux/reducers/allUsersReducer";
import styled from "styled-components/macro";
import {useDispatch} from "react-redux";
import Box from "@mui/material/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NewClients = () => {

    const [clients, setNewClients] = useState(null)
    const dispatch = useDispatch()

    const getData = () => {
        dispatch(getUsers()).then((response) => {
            setNewClients(response.data)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Paper sx={{margin: '5px', padding: '5px', marginTop: '-10px', boxShadow: '0px -1px #c3c3c3' }}>
            <Box sx={{color: 'text.primary', fontSize: 28, fontWeight: 'medium', padding: '3px 0px 10px 9px' }}>Новые пользователи</Box>
            {clients?.map(el=>{
                return(
                    <Line>
                        <Box sx={{color: '#1976d2', fontSize: 54, verticalAlign: 'medium'}} component={AccountCircleIcon}/>
                        <ClientName>
                            {el.firstName + ' ' + el.secondName}
                        </ClientName>
                    </Line>
                )
            })}
        </Paper>
    );
};

const Line = styled.div`
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #e2e9ed;
    }

`;
const ClientName = styled.div`
    margin-left: 10px;
`;


export default NewClients;