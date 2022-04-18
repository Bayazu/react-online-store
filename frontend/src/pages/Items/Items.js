import styled from 'styled-components/macro'
import React, {useEffect} from 'react';
import ItemCard from "./ItemPanels/ItemCard";
import {useDispatch, useSelector} from "react-redux";
import {getItems} from "../../redux/reducers/itemsReducer";
import MuiTable from "../dashboard/clients/ClientsTable";


const Items = () => {

    const items = useSelector((state) => state.itemsPage.items)
    const dispatch = useDispatch()

    console.log(items)


    useEffect(() => {
        dispatch(getItems())
    }, [])


    return (

        <Container>
            <Block>
                {items?.map(item => {
                    return (
                        <ItemCardWrapper key={item._id}>
                            <ItemCard
                                item={item}
                            />
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