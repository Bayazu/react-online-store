import styled from 'styled-components/macro'

import React, {useEffect} from 'react';

import ItemCard from "./ItemPanels/ItemCard";
import axios from "axios";
import {itemsAPI} from "../../api/api";

const arr = [1, 2, 3, 4, 5, 6, 7, 8]

const Items = () => {

    useEffect(() => {
        itemsAPI.getItems().then(data => {
            console.log(data)
        });
    }, [])

    return (

        <Container>
            <Block>
                {arr.map(el => {
                    return (
                        <ItemCardWrapper>
                            <ItemCard/>
                        </ItemCardWrapper>
                    )
                })}
            </Block>
        </Container>

    );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const ItemCardWrapper = styled.div`
  display: flex;
  padding: 25px;
`;

const Block = styled.div`
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
`;

export default Items;