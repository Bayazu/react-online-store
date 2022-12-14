import React from 'react';
import {Paper} from "@mui/material";
import styled from "styled-components/macro";
import Box from "@mui/material/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HeaderText from "../../../components/HeaderText";
import {useNavigate} from "react-router-dom";


const NewClients = (props) => {
    const navigate = useNavigate()

    return (
        <Paper sx={{margin: '5px', padding: '5px', marginTop: '-10px', boxShadow: '0px -1px #c3c3c3' }}>
            <HeaderText text={'Новые пользователи'}/>
            {props?.newUsersForWeek?.map(el=>{
                return(
                    <Line>
                        <Box sx={{color: '#1976d2', fontSize: 54, verticalAlign: 'medium'}} component={AccountCircleIcon}/>
                        <ClientName onClick={()=>navigate(`/profileUser/${el._id}`)}>
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