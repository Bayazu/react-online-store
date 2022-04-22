import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {defaultTabs} from "../../constants";
import {Link} from "react-router-dom";
import styled from "styled-components/macro";


export default function DashboardTabs() {
    const [value, setValue] = useState(0);
    let navigate = useNavigate();
    // let history = useHistory();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(event)
        console.log(newValue)
        const foundedPage = defaultTabs.find(el => el.value === newValue)
        console.log(foundedPage)
        //  console.log(foundedPage)
        navigate(foundedPage?.label)
        // console.log(foundedPage.label)
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
                        {/*<Tab label="Item Three"/>*/}
                        {/*<Tab label="Item Four"/>*/}
                        {/*<Tab label="Item Five"/>*/}
                        {/*<Tab label="Item Six"/>*/}
                        {/*<Tab label="Item Seven"/>*/}
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