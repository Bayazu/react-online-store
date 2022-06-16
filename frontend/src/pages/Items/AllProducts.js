import styled from 'styled-components/macro'
import React, {useEffect, useState} from 'react';
import ProductCard from "./ItemPanels/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {getItems} from "../../redux/reducers/itemsReducer";
import {useNavigate} from "react-router-dom";
import {Search} from "@mui/icons-material";
import Input from "../../components/controls/Input";
import {InputAdornment} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import {makeStyles} from "@material-ui/core/styles";
import BasicSelect from "../dashboard/products/TagSelect";
import {productsAPI} from "../../api/productsAPI";


const AllProducts = () => {


    const items = useSelector((state) => state.itemsPage.items)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [tagValue, setTagValue] = useState('Выберите категорию');
    const [products, setProducts] = useState()

    useEffect(() => {
        dispatch(getItems())
    }, [])

    useEffect(()=>{
        productsAPI.getItems().then(response => {
            if(response.status === 200 ){
                setProducts(response.data)
            }
        });
    },[])

    const onNavigate = (id) => {
        return navigate(`/product/${id}`)
    }
    const useStyles = makeStyles(theme => ({
        pageContent: {
            margin: theme.spacing(5),
            padding: theme.spacing(3)
        },
        searchInput: {
            width: '780px',
            marginRight: '10px'
        },
    }))

    const classes = useStyles();

    const handleSearch = e =>{
        let target = e.target.value;
        productsAPI.sortProducts(target).then((response)=>{
            if (response.status ===200){
                setProducts(response.data)
            }
        })
    }

    useEffect(()=>{
        if(tagValue !== 'Выберите категорию'){
            productsAPI.sortProductsByTag(tagValue).then((response)=>{
                setProducts(response.data)
            })
        }else{
            setProducts(items)
        }
    },[tagValue])


    return (
        <Container>
            <Block>
                <ContainerSearch>
                    <Toolbar>
                        <InputWrapper>
                            <Input
                                label='Поиск товара'
                                className={classes.searchInput}
                                InputProps={{
                                    startAdornment: (<InputAdornment position=''>
                                        <Search/>
                                    </InputAdornment>)
                                }}
                                onChange={handleSearch}
                            />
                        </InputWrapper>
                        <SelectWrapper>
                            <BasicSelect tagValue={tagValue} setTagValue={setTagValue}/>
                        </SelectWrapper>
                    </Toolbar>
                </ContainerSearch>
                {products?.map(item => {
                    return (
                        <ItemCardWrapper key={item._id} onClick={() => onNavigate(item._id)}>

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
const InputWrapper = styled.div`
  width: 100%;,
margin-right: 10 px;
`;

const SelectWrapper = styled.div`
  margin-left: 10px;
`;
const ContainerSearch = styled.div`
  margin-top: 8px;
  padding: 5px;
  display: flex;
  width: 100%;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`;

const Container = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-content: space-between;
  align-items: center;
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