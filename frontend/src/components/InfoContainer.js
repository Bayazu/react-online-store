import React from 'react';
import Box from "@mui/material/Box";
import styled from "styled-components/macro";


const InfoContainer = (props) => {
    const changeWordToUpperCase = (word) => {
        const splitWord = word.split('')
        const newWord = splitWord.map((el, index) =>{
            if(index === 0){
                return el.toUpperCase()
            }
            return el
        })
       return newWord.join('')
    }


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
                                changeWordToUpperCase(props?.clientAddress?.country) + ', '
                                + changeWordToUpperCase(props?.clientAddress?.city) + ', '
                                + changeWordToUpperCase(props.clientAddress?.street)
                                + ', д.' + changeWordToUpperCase(props?.clientAddress?.building) + ', '
                                + 'кв. ' + changeWordToUpperCase(props?.clientAddress?.apartment)
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