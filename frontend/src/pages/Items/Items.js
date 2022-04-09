import styled from 'styled-components/macro'

import React from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ItemCard from "./ItemPanels/ItemCard";

const arr = [1, 2]


const Items = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{bgcolor: "#cfe8fc", height: "100vh"}}>

                {arr.map(el => {
                    return (
                        <ItemCardWrapper>
                            <ItemCard/>
                        </ItemCardWrapper>
                    )
                })}

            </Box>
        </Container>
    );
};

const ItemCardWrapper = styled.div`
  padding: 25px
`;

export default Items;