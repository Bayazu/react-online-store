import React from 'react';
import Box from "@mui/material/Box";
import styled from "styled-components/macro";


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
                fontSize: props.fontSize || 34,
                fontWeight: 'medium',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {props?.clientAddress
                    ?
                    <>
                        <Box>
                            {
                                props?.clientAddress?.apartment + ', '
                                + props?.clientAddress?.building + ', '
                                + props?.clientAddress?.city + ', '
                                + props?.clientAddress?.country + ', '
                                + props.clientAddress?.street
                            }
                        </Box>
                    </>
                    :
                    null
                }
                {props?.clientInfo
                    ?
                    <Wrapper>
                        <Box>
                            {'E-mail: ' + props?.clientInfo?.email}
                        </Box>
                        <Box>
                            {'Username: ' + props?.clientInfo?.username}
                        </Box>
                    </Wrapper>
                    : null
                }
                {
                    !props?.clientInfo && !props.clientAddress ?
                        <Box>
                            {props.textSecondary}
                        </Box>
                        : null
                }
                <Box sx={{color: 'success.dark', fontSize: 54, verticalAlign: 'medium'}} component={props.Icon}/>
            </Box>
        </Box>

    );
};

const Wrapper = styled.div`

`;


export default InfoContainer;