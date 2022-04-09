import styled from 'styled-components/macro'

import React from 'react';

import ItemCard from "./ItemPanels/ItemCard";
import axios from "axios";

const arr = [1, 2, 3, 4, 5, 6, 7, 8]

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
    crossDomain: true,
});


const Items = () => {


    const getData = () => {
        console.log('ss')
        instance.get('product/listing',{
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "localhost:8080"
            },
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }


    return (
        <Container>
            {arr.map(el => {
                return (
                    <ItemCardWrapper>
                        <div onClick={() => getData()}>ЫЫЫЫ</div>
                        <ItemCard/>
                    </ItemCardWrapper>
                )
            })}
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
  max-width: 300px;
`;

export default Items;