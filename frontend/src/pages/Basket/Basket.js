import React, {useEffect} from 'react';
import styled from "styled-components/macro";
import {Paper} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import {backEndUrl} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import Input from "../../components/controls/Input";
import AddIcon from "@mui/icons-material/Add";
import CustomButton from "../../components/controls/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import useWindowDimensions from "../../helpers/hooks/useWindowDimensions";
import {
    changeBasket,
    changeBasketAC,
    getTotalProductsPrice,
    removeProductFromBasket
} from "../../redux/reducers/basketReducer";
import InfoContainer from "../../components/InfoContainer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CloseIcon from "@material-ui/icons/Close";



const Basket = () => {

    const basket = useSelector((state) => state.basket?.basket)
    const totalProductsPrice = useSelector((state) => state.basket?.totalProductsPrice)

    const dispatch = useDispatch()

    console.log(totalProductsPrice);

    useEffect(() => {
        dispatch(getTotalProductsPrice())
    }, [basket])


    //TODO переписать логику вычеслений стоимости на редакс

    const addOneProduct = (id) => {
        const product = basket.find(el => el._id === id)
        const price = product.price
        const amountInOrder = product.amountInOrder + 1
        const productSummaryPrice = price * amountInOrder
        const newProductData = {
            id: id,
            amountInOrder: amountInOrder,
            productSummaryPrice: productSummaryPrice
        }
        dispatch(changeBasket(newProductData))
    }
    const removeOneProduct = (id) => {
        const product = basket.find(el => el._id === id)
        const price = product.price
        const amountInOrder = product.amountInOrder - 1
        if (amountInOrder < 1) {
            return
        }
        const productSummaryPrice = price * amountInOrder
        const newProductData = {
            id: id,
            amountInOrder: amountInOrder,
            productSummaryPrice: productSummaryPrice
        }
        dispatch(changeBasket(newProductData))
    }

    const {width} = useWindowDimensions();

    const changeResolution = width < 1214;

    // TODO Переписать вёрстку на человечачий, вместо ёбаного Mui

    const addProductToBasket = () => {
        console.log('dasopkads')
    }
    const removeProductBasket = (id) => {
        dispatch(removeProductFromBasket(id))
    }

    return (
        <Container>
            {basket?.length !== 0
                ?
                <>
                    <Half changeResolution={changeResolution}>
                        {basket?.map((product) => {
                            return (
                                <ProductContainer>
                                    <Paper>
                                        <CardContainer changeResolution={changeResolution}>
                                            <CardMedia
                                                component="img"
                                                image={backEndUrl + product.image}
                                                alt="green iguana"
                                            />
                                            <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
                                                <ProductName> Наименование : {product.name}</ProductName>
                                                <ProductDescription>Id товара : {product._id}</ProductDescription>
                                                <ProductDescription>Количество
                                                    : {product.amountInOrder}</ProductDescription>
                                            </CardContent>
                                            <PricePart>
                                                <ProductPrice>{product.productSummaryPrice} ₽</ProductPrice>
                                                <AmountContainer>
                                                    <Button onClick={() => removeOneProduct(product._id)}>
                                                        <RemoveIcon/>
                                                    </Button>
                                                    <InputWrapper>
                                                        <Input
                                                            value={product.amountInOrder}
                                                        />
                                                    </InputWrapper>
                                                    <Button onClick={() => addOneProduct(product._id)}>
                                                        <AddIcon/>
                                                    </Button>
                                                </AmountContainer>
                                            </PricePart>
                                            <Button
                                                onClick={() => removeProductBasket(product._id)}
                                                sx={{
                                                    color: '#ef5350',
                                                    minWidth: 0,
                                                    height: '35px',
                                                    marginLeft: '174px',
                                                }}>
                                                <CloseIcon fontSize='small'/>
                                            </Button>
                                        </CardContainer>
                                    </Paper>
                                </ProductContainer>
                            )
                        })}
                    </Half>
                    <Half>
                        <InfoBasketContainer>
                            <Paper sx={{display: 'flex', flexDirection: 'column'}}>
                                <InfoContainer headerText={'Итоговая сумма заказа'}
                                               textSecondary={`${totalProductsPrice} Рублей`} Icon={AttachMoneyIcon}/>
                                <CustomButton
                                    startIcon={<ShoppingCartIcon/>}
                                    onClick={() => {
                                        addProductToBasket()
                                    }}
                                    type="submit"
                                    variant={'outlined'}
                                    sx={{
                                        margin: 'spacing(0.5)',
                                    }}
                                    text={'Оформить заказ'}
                                />
                            </Paper>
                        </InfoBasketContainer>
                    </Half>
                </>
                :
                <EmptyBasket>
                    <InfoContainer headerText={'Корзина пуста'} textSecondary={'Вы не добавили ни одного товара в корзину'} />
                </EmptyBasket>
            }


        </Container>
    );
};

const Container = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: row;
  // background: blue;
  //justify-content: space-around;
  font-family: Roboto, Helvetica, Arial, sans-serif;
`;

const ProductInfo = styled.div`
  //width: 300px;
  display: flex;
  flex-direction: column;

`;

const EmptyBasket = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Half = styled.div`
  //background: red;
  flex-wrap: wrap;
  //margin-right: 10px;
  margin-top: ${props => props.changeResolution && '5px'};
  width: ${props => props.changeResolution ? '100%' : '50%'};
  display: flex;
  flex-direction: ${props => props.changeResolution ? 'column' : 'column'};
`;

// const ProductContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   // width: 820px;
// `;

const ProductContainer = styled.div`
  padding: 10px;
`;

const InfoBasketContainer = styled.div`
  padding: 10px;
`;

const ProductPrice = styled.div`
  //font-weight: 300;
  //font-size: 32px;
  line-height: 3.6;
  letter-spacing: 0.0075em;
  display: flex;
  justify-content: center;
`;

const ProductDescription = styled.div`

`;

const ProductName = styled.div`

`;

const CardContainer = styled.div`
  max-height: 150px;
  width: 300px;
  //min-Width: 50%;
  display: flex;
  //flex-direction: row;
  flex-direction: ${props => props.changeResolution ? 'column' : 'row'};
`;

const AmountContainer = styled.div`
  display: flex;
  //@media (max-width: 970px) {
  //  justify-content: space-between;
  //  margin-bottom: 25px;
  //}
`;

const PricePart = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  ////justify-content: space-between;
  //justify-content: space-evenly;
  //// align-items: center;

  //@media (max-width: 970px) {
  //  flex-direction: column;
  //}
`;

const InputWrapper = styled.div`
  width: 50px;
`;

export default Basket;