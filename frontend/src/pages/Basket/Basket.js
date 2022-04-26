import React, {useState} from 'react';
import styled from "styled-components/macro";
import {Paper, Tooltip} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import {backEndUrl} from "../../constants";
import {useSelector} from "react-redux";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import Input from "../../components/controls/Input";
import AddIcon from "@mui/icons-material/Add";
import CustomButton from "../../components/controls/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";


const Basket = () => {

    const basket = useSelector((state) => state.basket?.basket)

    console.log(basket)

    const [amount, setAmount] = useState(1)

    const addOneProduct = () => {
        setAmount(prevState => prevState + 1)
    }
    const removeOneProduct = () => {
        if (amount < 2) {
            return
        }
        setAmount(prevState => prevState - 1)
    }

    // TODO Переписать вёрстку на человечачий, вместо ёбаного Mui

    return (
        <Container>

            {basket?.map((product) => {
                return (
                    <ProductContainer>
                        <Paper>
                            <Card>
                                <CardContainer>
                                    <CardMedia
                                        component="img"
                                        minheight="380"
                                        image={backEndUrl + product.image}
                                        alt="green iguana"
                                    />
                                    <CardContent sx={{display: 'flex', flexDirection: 'column'}}>

                                        <ProductInfo>
                                            <ProductName> Наименование : {product.name}</ProductName>
                                            <ProductDescription>Id товара : {product._id}</ProductDescription>
                                            <ProductDescription>Количество : {amount}</ProductDescription>
                                        </ProductInfo>

                                        <PricePart>
                                            <ProductPrice>{product.price} ₽</ProductPrice>
                                            <AmountContainer>
                                                <Button onClick={() => removeOneProduct()}>
                                                    <RemoveIcon/>
                                                </Button>
                                                <InputWrapper>
                                                    <Input
                                                        value={amount}
                                                    />
                                                </InputWrapper>
                                                <Button onClick={() => addOneProduct()}>
                                                    <AddIcon/>
                                                </Button>
                                            </AmountContainer>
                                        </PricePart>
                                    </CardContent>

                                </CardContainer>
                            </Card>
                        </Paper>
                    </ProductContainer>
                )
            })}

        </Container>
    );
};

const Container = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  //justify-content: space-around;
  font-family: Roboto, Helvetica, Arial, sans-serif;
`;

const ProductInfo = styled.div`
  //width: 300px;
  display: flex;
  flex-direction: column;

`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
 // width: 820px;
`;

const ProductPrice = styled.div`
  font-weight: 300;
  font-size: 32px;
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
  width: 300px;
  //min-Width: 50%;
  display: flex;
  flex-direction: column;
`;

const AmountContainer = styled.div`
  display: flex;
  @media (max-width: 970px) {
    justify-content: space-between;
    margin-bottom: 25px;
  }
`;

const PricePart = styled.div`
  display: flex;
  align-items: center;
  //justify-content: space-between;
  justify-content: space-evenly;
  // align-items: center;
  flex-direction: column;
  @media (max-width: 970px) {
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  width: 50px;
`;

export default Basket;