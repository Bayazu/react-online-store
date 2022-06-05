import React, {useEffect, useState} from 'react';
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
import CardContent from "@mui/material/CardContent";
import useWindowDimensions from "../../helpers/hooks/useWindowDimensions";
import {
    changeBasket,
    changeBasketAC, clearBasket, createOrder,
    getTotalProductsPrice,
    removeProductFromBasket
} from "../../redux/reducers/basketReducer";
import InfoContainer from "../../components/InfoContainer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "../../components/modal/Modal";
import {useNavigate} from "react-router-dom";



const Basket = () => {

    const basket = useSelector((state) => state.basket?.basket)
    const totalProductsPrice = useSelector((state) => state.basket?.totalProductsPrice)
    const [modalActive, setModalActive] = useState(false)
    const [badRequest, setBadRequest] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()


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

    // TODO Переписать вёрстку на человечачий, вместо  Mui


    const createNewOrder = () => {
        const basketToDispatch = basket.map((el) => {
            return {
                _id: el._id,
                amount: el.amountInOrder
            }
        })
        dispatch(createOrder(basketToDispatch)).then((response) => {
            if (response.status === 200) {
                setModalActive(true)
            }
            if (response.status === 400) {
                setModalActive(true)
                setBadRequest(true)
            }
        })
    }
    const removeProductBasket = (id) => {
        dispatch(removeProductFromBasket(id))
    }

    const onSubmitModal = () => {
        if (!badRequest) {
            navigate("/profile");
            setModalActive(false)
            setBadRequest(false)
            dispatch(clearBasket())
        } else {
            setModalActive(false)
            setBadRequest(false)
        }
    }

    return (
        <>
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
                                        createNewOrder()
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
                    <InfoContainer headerText={'Корзина пуста'}
                                   textSecondary={'Вы не добавили ни одного товара в корзину'}/>
                </EmptyBasket>
            }


        </Container>
            <Modal active={modalActive} setActive={setModalActive}>
                <WrapperContentText>
                    <div>
                        {badRequest ? "Произошла ошибка при покупке товара" : "Товар успешно куплен и добавлен в профиль заказов"}
                    </div>
                </WrapperContentText>
                <ButtonWrapper>
                    <Button
                        variant="contained"
                        onClick={() => (onSubmitModal())}>
                        Ок
                    </Button>
                </ButtonWrapper>

            </Modal>
        </>
    );
};

const WrapperContentText = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

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