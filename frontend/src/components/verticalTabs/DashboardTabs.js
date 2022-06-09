import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {defaultTabs} from "../../constants";
import styled from "styled-components/macro";
import {useLocation} from "react-router";


export default function DashboardTabs() {
    const [value, setValue] = useState(0);
    let navigate = useNavigate();
    //const location = useLocation()

    const handleChange = (event, newValue) => {
        setValue(newValue);

        const foundedPage = defaultTabs.find(el => el.value === newValue)

        navigate(foundedPage?.label)

        console.log('ss')

    };


    return (
        <Container>
            <Left>
                <Box
                    // sx={{  bgcolor: '#eff5f8', display: 'flex', height: 800 }}
                    // sx={{  bgcolor: '#eff5f8', display: 'flex'}}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        sx={{borderRight: 1, borderColor: 'divider'}}
                    >
                        {/*<Tab label="Дашборд" />*/}

                        <Tab label="Клиенты"/>
                        <Tab label="Товары"/>
                        <Tab label="Дашборд"/>
                        <Tab label="Заказы"/>
                        {/*<Tab label="Product Three"/>*/}
                        {/*<Tab label="Product Four"/>*/}
                        {/*<Tab label="Product Five"/>*/}
                        {/*<Tab label="Product Six"/>*/}
                        {/*<Tab label="Product Seven"/>*/}
                    </Tabs>
                </Box>
            </Left>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
`;
const Left = styled.div`
  display: flex;
  flex: 0 1 auto;
`;
const Right = styled.div`
  display: flex;
  flex: 3 1 0;
  max-width: 94%;
`;