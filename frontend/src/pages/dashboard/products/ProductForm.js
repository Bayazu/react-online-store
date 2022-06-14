import React, {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {Paper} from "@mui/material";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import useWindowDimensions from "../../../helpers/hooks/useWindowDimensions";
import CustomButton from "../../../components/controls/Button";
import HeaderText from "../../../components/HeaderText";
import Input from "../../../components/controls/Input";
import {useSelector} from "react-redux";
import ActionAlert from "../../../components/alert/ActionAlert";
import styled from "styled-components/macro";
import UploadIcon from '@mui/icons-material/Upload';
import CardMedia from "@mui/material/CardMedia";
import {backEndUrl} from "../../../constants";


const ProductForm = (props) => {

    const userRole = useSelector((state) => state.user.userRole)

    const {
        productData,
        openAlert,
        setOpenAlert,
        createNewItem = (data) => {
        },
        modifyProduct = (data) => {
        },
        isCreate = false,
    } = props

    const {width} = useWindowDimensions();
    const changeResolution = width < 1214;

    const [image, setImage] = useState('')
    const [imageDisplay, setImageDisplay] = useState(null)


    const {
        formState: {
            errors
        },
        reset,
        handleSubmit,
        control
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
            price: '',
            tag: '',
            image: ''
        }, mode: "onBlur"
    })

    const onSubmit = async (data) => {
        if (isCreate) {
            const itemData = {
                ...data,
                image
            }
            createNewItem(itemData).then((response) => {
                    if (response.status === 200) {
                        reset(null)
                        setImage('')
                    }
                }
            )
        } else {
            const itemData = {
                ...data,
                image
            }
            modifyProduct(itemData)
        }
    }

    useEffect(() => {
        if (productData) {
            reset({
                description: productData.description,
                name: productData.name,
                price: productData.price,
                tag: productData.tag,
            })
            setImageDisplay(productData.image)
        }
    }, [productData])

    const InputImage = styled('input')({
        display: 'none',
    });

    const uploadImage = (e) => {
        const file = e.target.files[0]
        setImage(file)
        setImageDisplay(null)
    }

    return (<Container changeResolution={changeResolution}>
        <Box component={Paper} sx={{padding: 2, minWidth: 0, width: changeResolution ? '100%' : null}}>
            <Half>
                <ActionAlert openAlert={openAlert} setOpenAlert={setOpenAlert}
                             text={'Данные пользователя успешно изменены'}/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <HeaderText text={'Данные о товаре'} padding={'0px 0px 0px 19px'}/>
                    <Wrapper changeResolution={changeResolution}>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='Наименование товара'
                                    {...field}
                                />}
                                name="name"
                                control={control}
                            />
                        </InputWrapper>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='Цена'
                                    {...field}
                                />}
                                name="price"
                                control={control}
                            />
                        </InputWrapper>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                //TODO переписать на селект
                                render={({field}) => <Input
                                    label='Категория'
                                    {...field}
                                />}
                                name="tag"
                                control={control}
                            />
                        </InputWrapper>
                    </Wrapper>
                    <Wrapper changeResolution={changeResolution}>

                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='Описание'
                                    {...field}
                                />}
                                name="description"
                                control={control}
                            />
                        </InputWrapper>
                    </Wrapper>
                    <HeaderText text={'Картинка'} padding={'0px 0px 0px 19px'}/>
                    <WrapperButtons>
                        {image
                            ? <HeaderText text={image.name} padding={'0px 0px 0px 19px'}/>
                            : <Controller
                                render={({field}) =>
                                    <label htmlFor="contained-button-file">
                                        <InputImage onChange={(e) => uploadImage(e)} id="contained-button-file"
                                                    type="file"/>
                                        <CustomButton
                                            fullWidth
                                            component="span"
                                            startIcon={<UploadIcon/>}
                                            type="submit"
                                            sx={{
                                                margin: 'spacing(0.5)',
                                                // position: 'absolute',
                                                right: '10px',
                                            }}
                                            text={'загрузить'}
                                            {...field}
                                        />
                                    </label>
                                }
                                name="image"
                                control={control}
                            />
                        }
                    </WrapperButtons>
                    <WrapperButtons>
                        <CardWrapper>
                            <CardContainer>
                                <CardMedia
                                    component="img"
                                    maxHeight="300"
                                    maxWidth="200"
                                    image={backEndUrl + imageDisplay}
                                />
                            </CardContainer>
                        </CardWrapper>
                    </WrapperButtons>
                    <WrapperButtons>
                        {userRole === 'ADMIN' && !isCreate
                            ?
                            <Controller
                                render={({field}) => <CustomButton
                                    startIcon={<DeleteIcon/>}
                                    type="submit"
                                    variant='outlined'
                                    sx={{
                                        margin: 'spacing(0.5)',
                                        right: '10px',
                                    }}
                                    text={'Удалить товар'}
                                    {...field}
                                />}
                                name="textField"
                                control={control}
                            />
                            : null
                        }
                        <Controller
                            render={({field}) => <CustomButton
                                startIcon={<SaveIcon/>}
                                type="submit"
                                variant='outlined'
                                sx={{
                                    margin: 'spacing(0.5)',
                                    color: "#1976d2",
                                    // position: 'absolute',
                                    right: '10px',
                                }}
                                text={'Сохранить'}
                                {...field}
                            />}
                            name="textField"
                            control={control}
                        />
                    </WrapperButtons>
                </form>
            </Half>
        </Box>
    </Container>);
};


const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CardContainer = styled.div`
  max-Width: 50%;
  display: flex;
`;


const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;
  margin-right: 5px;
  flex-direction: ${props => props.changeResolution ? 'column' : 'row'};
}
`;
const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: ${props => props.changeResolution ? 'column' : 'row'};
`;

const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 7px 0 26px;

  label {
    width: 100%
  }
`;

const Container = styled.div`

  width: 100%;
  display: flex;
  justify-content: ${props => props.changeResolution ? 'center' : null};

`;

const Half = styled.div`

`;

export default ProductForm;