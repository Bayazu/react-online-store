import React, {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import styled from "styled-components/macro";
import {Paper} from "@mui/material";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import useWindowDimensions from "../../../helpers/hooks/useWindowDimensions";
import CustomButton from "../../../components/controls/Button";
import HeaderText from "../../../components/HeaderText";
import Input from "../../../components/controls/Input";
import {useDispatch, useSelector} from "react-redux";
import ActionAlert from "../../../components/alert/ActionAlert";


const ClientForm = (props) => {

    const userRole = useSelector((state) => state.user.userRole)

    const {
        userData,
        openAlert,
        setOpenAlert,
        createUserSubmit = (data) => {
        },
        modifyUser = (data) => {
        },
        isCreate = false,
    } = props

    const {width} = useWindowDimensions();
    const changeResolution = width < 1214;
    const dispatch = useDispatch()


    const {
        register,
        formState: {
            errors
        },
        reset,
        handleSubmit,
        control
    } = useForm({
        defaultValues: {
            username: '',
            firstName: '',
            secondName: '',
            email: '',
            country: '',
            city: '',
            street: '',
            building: '',
            apartment: '',
            password: '',
            passwordConfirm: '',
        }, mode: "onBlur"
    })

    const onSubmit = async (data) => {
        if(createUserSubmit){
            createUserSubmit(data).then((response)=>{
                if(response.status === 200){
                    reset(null)
                }
            })
        }
        modifyUser(data)
    }

    useEffect(() => {
        if (userData) {
            reset({
                username: userData.username,
                firstName: userData.firstName,
                secondName: userData.secondName,
                email: userData.email,
                country: userData.country,
                city: userData.city,
                street: userData.street,
                building: userData.building,
                apartment: userData.apartment
            })
        }
    }, [userData])


    return (<Container changeResolution={changeResolution}>
        <Box component={Paper} sx={{padding: 2, minWidth: 0, width: changeResolution ? '100%' : null}}>
            <Half>
                <ActionAlert openAlert={openAlert} setOpenAlert={setOpenAlert}
                             text={'Данные пользователя успешно изменены'}/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <HeaderText text={'Личные данные'} padding={'0px 0px 0px 19px'}/>
                    <Wrapper changeResolution={changeResolution}>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='Логин'
                                    {...field}
                                />}
                                name="username"
                                control={control}
                            />
                        </InputWrapper>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='Имя'
                                    {...field}
                                />}
                                name="firstName"
                                control={control}
                            />
                        </InputWrapper>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='Фамилия'
                                    {...field}
                                />}
                                name="secondName"
                                control={control}
                            />
                        </InputWrapper>
                    </Wrapper>
                    <Wrapper changeResolution={changeResolution}>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='E-mail'
                                    {...field}
                                />}
                                name="email"
                                control={control}
                            />
                        </InputWrapper>
                    </Wrapper>
                    <HeaderText text={'Адрес'} padding={'0px 0px 0px 19px'}/>
                    <Wrapper changeResolution={changeResolution}>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='Страна'
                                    {...field}
                                />}
                                name="country"
                                control={control}
                            />
                        </InputWrapper>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='Город'
                                    {...field}
                                />}
                                name="city"
                                control={control}
                            />
                        </InputWrapper>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='Улица'
                                    {...field}
                                />}
                                name="street"
                                control={control}
                            />
                        </InputWrapper>
                    </Wrapper>
                    <Wrapper changeResolution={changeResolution}>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='Дом'
                                    {...field}
                                />}
                                name="building"
                                control={control}
                            />
                        </InputWrapper>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='Квартира'
                                    {...field}
                                />}
                                name="apartment"
                                control={control}
                            />
                        </InputWrapper>
                    </Wrapper>
                    <HeaderText text={'Пароль'} padding={'0px 0px 0px 19px'}/>
                    <Wrapper changeResolution={changeResolution}>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='Пароль'
                                    {...field}
                                />}
                                name="password"
                                control={control}
                            />
                        </InputWrapper>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='Подтверждение пароля'
                                    {...field}
                                />}
                                name="passwordConfirm"
                                control={control}
                            />
                        </InputWrapper>
                    </Wrapper>
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
                                    text={'Удалить пользователя'}
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

const InputWrapper = styled.div`
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
`;

const Container = styled.div`

  width: 100%;
  display: flex;
  justify-content: ${props => props.changeResolution ? 'center' : null};

`;

const Half = styled.div`

`;

export default ClientForm;