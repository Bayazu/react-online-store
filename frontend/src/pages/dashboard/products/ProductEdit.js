import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";
import {useDispatch} from "react-redux";
import {useParams} from "react-router";
import useWindowDimensions from "../../../helpers/hooks/useWindowDimensions";
import ProductForm from "./ProductForm";
import UserOrders from "../clients/UserOrders";
import {modifyItem} from "../../../redux/reducers/itemsReducer";
import {productsAPI} from "../../../api/productsAPI";


const ProductEdit = () => {

    const {width} = useWindowDimensions();
    const changeResolution = width < 1214;
    const [productData, setProductData] = useState(null)
    const dispatch = useDispatch()
    const [openAlert, setOpenAlert] = useState(false)

    const params = useParams()
    const productId = params.id

    useEffect(() => {
        productsAPI.getOneItem(productId).then((response)=>{
            setProductData(response.data)
        })
    }, [])

    const modifyProduct = (data) =>{
        const itemData = new FormData()
        itemData.append('image', data.image)
        itemData.append('name', data.name)
        itemData.append('description', data.description)
        itemData.append('price', data.price)
        itemData.append('tag', data.tag)
        dispatch(modifyItem(itemData,productId)).then((response) => {
            if(response.status === 200){
                setOpenAlert(true)
            }
        })
    }

    return (
        <Container changeResolution={changeResolution}>
            <Half changeResolution={changeResolution}>
                <ProductForm modifyProduct={modifyProduct} productData={productData} openAlert={openAlert} setOpenAlert={setOpenAlert}/>
            </Half>
            <Half changeResolution={changeResolution}>
                {/*<InnerWrapper>*/}
                {/*    <UserOrders changeResolution={changeResolution}/>*/}
                {/*</InnerWrapper>*/}
                {/*<InnerWrapper>*/}
                {/*    <FUCK/>*/}
                {/*</InnerWrapper>*/}
            </Half>
        </Container>
    )
};

const Container = styled.div`
  align-items: ${props => props.changeResolution ? 'center' : 'flex-start'};
  width: 100%;
  display: flex;
  flex-direction: ${props => props.changeResolution ? 'column' : 'row'};
`;
const Half = styled.div`
  flex-wrap: wrap;
  margin-right: 10px;
  margin-top: ${props => props.changeResolution && '5px'};
  width: ${props => props.changeResolution && '100%'};
  display: flex;
  flex-direction: ${props => props.changeResolution ? 'column' : 'row'};
`;
const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;


export default ProductEdit;