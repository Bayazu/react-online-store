import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";

export default function BasicSelect(props) {


    const handleChange = (event) => {
        props.setTagValue(event.target.value);
    };

    const names = [
        'Продукты',
        'Техника',
        'Бытовая химия',
        'Одежда',
        'Напитки',
        'Спорт'
    ];

    const useStyles = makeStyles(theme => ({
        select: {
            minHeight: '0px',
            height: '56px',
            width: '300px'
        },
    }));

    const classes = useStyles();

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Категория</InputLabel>
                <Select
                    className={classes.select}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.tagValue}
                    label="Категория"
                    onChange={handleChange}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
