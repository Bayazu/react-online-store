import React from 'react'
import {Button as MuiButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@mui/material/Button";

// const useStyles = makeStyles(theme => ({
//     root: {
//         margin: theme.spacing(0.5),
//         color: "#1976d2"
//     },
//     label: {
//         textTransform: 'none'
//     }
// }))


const CustomButton = React.forwardRef((props, ref) => {

    const {text, size, color, variant, onClick, ...other} = props


    return (
        <Button
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            ref={ref}

        >
            {text}
        </Button>
    )
})

export default CustomButton;