import React from 'react';
import Box from "@mui/material/Box";


const InfoContainer = (props) => {
    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 1,
                p: 2,
                minWidth: 0,
                margin: '5px',
                width: props.width || null,

            }}
        >
            <Box sx={{color: 'text.secondary'}}>{props.headerText}</Box>
            <Box sx={{
                color: 'text.primary',
                fontSize: 34,
                fontWeight: 'medium',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Box>
                    {props.textSecondary}
                </Box>
                <Box sx={{color: 'success.dark', fontSize: 54, verticalAlign: 'medium'}} component={props.Icon}/>
            </Box>
        </Box>

    );
};


export default InfoContainer;