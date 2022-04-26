import styled from 'styled-components/macro'
import React, {useEffect} from 'react';
import ProductCard from "./ItemPanels/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {getItems} from "../../redux/reducers/itemsReducer";
import {useNavigate} from "react-router-dom";


const AllProducts = () => {


    const items = useSelector((state) => state.itemsPage.items)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getItems())
    }, [])

    const onNavigate = (id) =>{
       return navigate(`/product/${id}`)
    }

    return (

        <Container>
            <Block>
                {items?.map(item => {
                    return (
                        <ItemCardWrapper key={item._id} onClick={()=>onNavigate(item._id)}>
                            <ProductCard
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

export default AllProducts;