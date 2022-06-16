import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import styled from 'styled-components/macro'
import {Paper, TextField, Tooltip} from "@mui/material";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CustomButton from "../../../components/controls/Button";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Input from "../../../components/controls/Input";
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import RemoveIcon from '@mui/icons-material/Remove';
import {setBasketProducts} from "../../../redux/reducers/basketReducer";
import {useDispatch, useSelector} from "react-redux";
import {backEndUrl} from "../../../constants";
import {useNavigate} from "react-router-dom";
import {productsAPI} from "../../../api/productsAPI";

const Product = () => {

    let params = useParams()
    const [product, setProduct] = useState(null)
    const [amount, setAmount] = useState(1)
    const [isProductInBasket, setIsProductInBasket] = useState(false)
    const navigate = useNavigate();
    let productSummaryPrice = product?.price * amount

    const dispatch = useDispatch()
    const basket = useSelector((state) => state.basket?.basket)


    useEffect(() => {
        basket?.map((el) => {
            if (el._id === product?._id) {
                setIsProductInBasket(true)
            } else {
                setIsProductInBasket(false)
            }
        })
    }, [basket, product])

    const getOneItem = (id) => {
        productsAPI.getOneItem(id).then(response => {
            if (response.status === 200) {
                setProduct(response.data)
            }
        })
    }

    useEffect(() => {
        getOneItem(params.id)
    }, [params])

    const addOneProduct = () => {
        setAmount(prevState => prevState + 1)
    }
    const removeOneProduct = () => {
        if (amount < 2) {
            return
        }
        setAmount(prevState => prevState - 1)
    }

    const addProductToBasket = () => {
        if(isProductInBasket){
            return navigate("/basket");
        }
        const productData = {
            product: product,
            amount: amount,
            productSummaryPrice: productSummaryPrice
        }
        dispatch(setBasketProducts(productData))
    }


    return (
        <Container>
            <ProductContainer>
                <CardContainer>
                    <CardMedia
                        component="img"
                        minheight="580"
                        image={backEndUrl + product?.image}
                        alt="green iguana"
                    />
                </CardContainer>
                <InfoContainer>
                    <ItemName>
                        {product?.name}
                    </ItemName>
                    <Description>
                        {product?.description}
                    </Description>
                    <Price>
                        {productSummaryPrice} ₽
                    </Price>
                    <PricePart>
                        <AmountContainer>
                            <Button disabled={isProductInBasket} onClick={() => removeOneProduct()}>
                                <RemoveIcon/>
                            </Button>
                            <InputWrapper>
                                <Input
                                    disabled={isProductInBasket}
                                    value={amount}
                                />
                            </InputWrapper>
                            <Button disabled={isProductInBasket} onClick={() => addOneProduct()}>
                                <AddIcon/>
                            </Button>
                        </AmountContainer>
                        <Tooltip
                            title={isProductInBasket ? 'Товар уже в корзине' : 'Нажмите, чтобы добавить товар в корзину'}>
                            <CustomButton
                                startIcon={<ShoppingCartIcon/>}
                                onClick={() => {
                                    addProductToBasket()
                                }}
                                type="submit"
                                variant={isProductInBasket ? 'outlined' : null}
                                sx={{

                                    margin: 'spacing(0.5)',
                                }}
                                text={isProductInBasket ? 'Перейти в корзину' : 'Добавить товар в корзину'}
                            />
                        </Tooltip>

                    </PricePart>
                </InfoContainer>
            </ProductContainer>
        </Container>
    );
};

export default Product;

const Container = styled.div`
  display: flex;
  //background: darkturquoise;
  justify-content: space-around;
  font-family: Roboto, Helvetica, Arial, sans-serif;
`;

const ProductContainer = styled.div`
  margin: 20px;
  width: 1200px;
  display: flex;

  @media (max-width: 970px) {
    flex-direction: column;
  }
`;

const CardContainer = styled.div`
  min-Width: 50%;
  display: flex;
`;
const Description = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  line-height: 1.6;
  letter-spacing: 0.0075em;
  text-align: justify;
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  margin-left: 40px;
  flex-direction: column;
  @media (max-width: 970px) {
    margin-left: 0;
  }
`;


const ItemName = styled.div`
  width: 100%;
  display: flex;
  font-weight: 300;
  font-size: 32px;
  line-height: 1.6;
  letter-spacing: 0.0075em;
`;

const AmountContainer = styled.div`
  display: flex;
  @media (max-width: 970px) {
    justify-content: space-between;
    margin-bottom: 25px;
  }
`;

const InputWrapper = styled.div`
  width: 50px;
`;

const PricePart = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 970px) {
    flex-direction: column;
  }
`;

const Price = styled.div`
  font-weight: 300;
  font-size: 32px;
  line-height: 3.6;
  letter-spacing: 0.0075em;
  display: flex;
  justify-content: center;
`;



