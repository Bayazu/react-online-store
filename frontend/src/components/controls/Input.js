import React from 'react'
import {TextField} from '@material-ui/core';


const Input = React.forwardRef((props, ref) => {

    const {name, label, value, onChange, ...other} = props;

    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            ref={ref}
            {...other}
        />)
})

export default Input;