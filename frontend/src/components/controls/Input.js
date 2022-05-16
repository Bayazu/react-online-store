import React from 'react'
import {TextField} from '@material-ui/core';
import {FormControl} from "@mui/material";


const Input = React.forwardRef((props, ref) => {

    const {name, label, value, onChange, ...other} = props;

    return (
        <FormControl fullWidth sx={{m: 1}} variant="filled">
            <TextField
                variant="outlined"
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                ref={ref}
                {...other}
            />
        </FormControl>

    )
})

export default Input;