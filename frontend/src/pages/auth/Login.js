import React, {useState} from 'react';
import styled from "styled-components/macro";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {useForm} from 'react-hook-form'

const Login = () => {

    const {

    } = useForm()


    return (
        <Container>
            <Block>

            </Block>
        </Container>

    );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Block = styled.div`
  max-width: 500px;
  display: flex;
  flex-wrap: wrap;
`;

export default Login;