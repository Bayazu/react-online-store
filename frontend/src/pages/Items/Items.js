import styled from 'styled-components/macro'

import React, {useCallback, useEffect} from 'react';

import ItemCard from "./ItemPanels/ItemCard";

import {useDispatch, useSelector} from "react-redux";
import {getData, getData1} from "../../redux/reducers/itemsReducer";


const arr = [1, 2, 3, 4, 5, 6, 7, 8]

const Items = () => {

    const Items = useSelector((state) => state)
    const dispatch = useDispatch()

    console.log(Items)

    useEffect(()=>{
        console.log('fuck')
        dispatch(getData1())
    },[])



    // const data = () => {
    //     dispatch(getData)
    // }

    //const getData = useCallback(() => dispatch({ type: 'increase-counter' }), [])


    //console.log(Items)

    // useEffect(() => {
    //     itemsAPI.getItems().then(data => {
    //         console.log(data)
    //     });
    // }, [])

    return (

        <Container>
            <Block>
                {arr.map(el => {
                    return (
                        <ItemCardWrapper>
                            <ItemCard />
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