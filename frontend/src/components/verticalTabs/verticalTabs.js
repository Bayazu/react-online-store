import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const data = [
    {
        label : '',
        value : 0,
    },
    {
        label : 'clients',
        value : 1,
    },
    {
        label : 'products',
        value : 2,
    }
]

export default function VerticalTabs() {
    const [value, setValue] = useState(0);
    let navigate = useNavigate();
    // let history = useHistory();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const foundedPage = data.find(el=> el.value === newValue)
        console.log(foundedPage)
        navigate(foundedPage?.label)
        console.log(foundedPage.label)
    };

    return (
        <Box
            sx={{  bgcolor: '#eff5f8', display: 'flex', height: 800 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Дашборд" />
                <Tab label="Клиенты" />
                <Tab label="Товары"/>
                {/*<Tab label="Item Three"/>*/}
                {/*<Tab label="Item Four"/>*/}
                {/*<Tab label="Item Five"/>*/}
                {/*<Tab label="Item Six"/>*/}
                {/*<Tab label="Item Seven"/>*/}
            </Tabs>
        </Box>
    );
}
