import React, {useRef, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import styled from "styled-components/macro";
import {Alert, Paper, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import HeaderText from "../../components/HeaderText";
import CustomButton from "../../components/controls/Button";
import Input from "../../components/controls/Input";
import useWindowDimensions from "../../helpers/hooks/useWindowDimensions";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {useNavigate} from "react-router-dom";
import Modal from "../../components/modal/Modal";
import Button from "@mui/material/Button";
import {usersAPI} from "../../api/usersAPi";


const Register = () => {

    const {width} = useWindowDimensions();
    const changeResolution = width < 1214;
    const navigate = useNavigate();
    const [modalActive, setModalActive] = useState(false)
    const [badRequest, setBadRequest] = useState(false)


    const onSubmit = async (data) => {
        usersAPI.createUser(data)
            .then(response => {
                if (response.status === 200) {
                    setModalActive(true)
                }
                if (response.status === 400) {
                    setModalActive(true)
                    setBadRequest(true)
                }
            })
    }

    const onSubmitModal = () => {
        if (!badRequest) {
            navigate("/login");
            setModalActive(false)
            setBadRequest(false)
        } else {
            setModalActive(false)
            setBadRequest(false)
        }
    }

    const {
        register,
        formState: {
            errors
        },
        watch,
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
            passwordConfirm: ''
        }, mode: "onBlur"
    })
    const password = useRef({});
    password.current = watch("password", "");


    return (<Container changeResolution={changeResolution}>
        <Box component={Paper} sx={{padding: 2, minWidth: 0, width: changeResolution ? '100%' : null}}>
            <Stack sx={{width: '100%'}} spacing={2}>
                {errors?.username && <Alert severity="error">{errors?.username.message}</Alert>}
                {errors?.password && <Alert severity="error">???????????? ???????????? ?????????? ???? 4 ???? 10 ????????????????</Alert>}
                {errors?.email && <Alert severity="error">{errors?.email.message}</Alert>}
                {errors?.firstName && <Alert severity="error">{errors?.firstName.message}</Alert>}
                {errors?.secondName && <Alert severity="error">{errors?.secondName.message}</Alert>}
                {errors?.country && <Alert severity="error">{errors?.country.message}</Alert>}
                {errors?.apartment && <Alert severity="error">{errors?.apartment.message}</Alert>}
                {errors?.building && <Alert severity="error">{errors?.building.message}</Alert>}
                {errors?.street && <Alert severity="error">{errors?.street.message}</Alert>}
                {errors?.city && <Alert severity="error">{errors?.city.message}</Alert>}
                {errors.passwordConfirm && <Alert severity="error">???????????? ???? ??????????????????</Alert>}
            </Stack>
            <Half>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <HeaderText text={'???????????? ????????????'} padding={'0px 0px 0px 19px'}/>
                    <Wrapper changeResolution={changeResolution}>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='??????????'
                                    {...field}
                                />}
                                name="username"
                                control={control}
                                rules={{required: '???????? ?????????? ?????????????????????? ?? ????????????????????'}}
                            />
                        </InputWrapper>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='??????'
                                    {...field}
                                />}
                                name="firstName"
                                control={control}
                                rules={{required: '???????? ?????? ?????????????????????? ?? ????????????????????'}}
                            />
                        </InputWrapper>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='??????????????'
                                    {...field}
                                />}
                                name="secondName"
                                control={control}
                                rules={{required: '???????? ?????????????? ?????????????????????? ?? ????????????????????'}}
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
                                type="email"
                                control={control}
                                rules={{
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "?????????? ???????????? ??????????????????????"
                                    }
                                }}
                            />
                        </InputWrapper>
                    </Wrapper>
                    <HeaderText text={'??????????'} padding={'0px 0px 0px 19px'}/>
                    <Wrapper changeResolution={changeResolution}>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='????????????'
                                    {...field}
                                />}
                                name="country"
                                control={control}
                                rules={{required: '???????? ???????????? ?????????????????????? ?? ????????????????????'}}
                            />
                        </InputWrapper>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='??????????'
                                    {...field}
                                />}
                                name="city"
                                control={control}
                                rules={{required: '???????? ?????????? ?????????????????????? ?? ????????????????????'}}
                            />
                        </InputWrapper>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='??????????'
                                    {...field}
                                />}
                                name="street"
                                control={control}
                                rules={{required: '???????? ?????????? ?????????????????????? ?? ????????????????????'}}
                            />
                        </InputWrapper>
                    </Wrapper>
                    <Wrapper changeResolution={changeResolution}>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='??????'
                                    {...field}
                                />}
                                name="building"
                                control={control}
                                rules={{required: '???????? ?????? ?????????????????????? ?? ????????????????????'}}
                            />
                        </InputWrapper>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='????????????????'
                                    {...field}
                                />}
                                name="apartment"
                                control={control}
                                rules={{required: '???????? ???????????????? ?????????????????????? ?? ????????????????????'}}
                            />
                        </InputWrapper>
                    </Wrapper>
                    <HeaderText text={'????????????'} padding={'0px 0px 0px 19px'}/>
                    <Wrapper changeResolution={changeResolution}>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='????????????'
                                    {...field}
                                />}
                                name="password"
                                type='password'
                                control={control}
                                rules={{
                                    required: true,
                                    minLength: 4,
                                    maxLength: 10
                                }}
                            />
                        </InputWrapper>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='?????????????????????????? ????????????'
                                    {...field}
                                />}
                                name="passwordConfirm"
                                type='password'
                                control={control}
                                rules={{
                                    required: true,
                                    validate: value => value === password.current || "The passwords do not match"
                                }}
                            />
                        </InputWrapper>
                    </Wrapper>
                    <WrapperButtons>
                        {/*<Controller*/}
                        {/*    render={({field}) => <CustomButton*/}
                        {/*        startIcon={<DeleteIcon />}*/}
                        {/*        type="submit"*/}
                        {/*        variant='outlined'*/}
                        {/*        sx={{*/}
                        {/*            margin: 'spacing(0.5)',*/}
                        {/*            right: '10px',*/}
                        {/*        }}*/}
                        {/*        text={'?????????????? ????????????????????????'}*/}
                        {/*        {...field}*/}
                        {/*    />}*/}
                        {/*    name="textField"*/}
                        {/*    control={control}*/}
                        {/*/>*/}
                        <Controller
                            render={({field}) => <CustomButton
                                startIcon={<BorderColorIcon/>}
                                type="submit"
                                variant='outlined'
                                sx={{
                                    margin: 'spacing(0.5)',
                                    color: "#1976d2",
                                    // position: 'absolute',
                                    right: '10px',
                                }}
                                text={'????????????????????????????????????'}
                                {...field}
                            />}
                            name="textField"
                            control={control}
                        />
                    </WrapperButtons>
                </form>
            </Half>
            <Modal active={modalActive} setActive={setModalActive}>
                <WrapperContentText>
                    <Text>
                        {badRequest ? "???????????????????????? ?? ?????????? ???????????? ?????? ????????????????????" : "???? ?????????????? ????????????????????????????????????"}
                    </Text>
                </WrapperContentText>
                <ButtonWrapper>
                    <Button
                        variant="contained"
                        onClick={() => (onSubmitModal())}>
                        ????
                    </Button>
                </ButtonWrapper>

            </Modal>
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
  justify-content: flex-end;
  display: flex;
  padding: 10px 7px 0 26px;
`;

const Container = styled.div`
  padding-top: 20px;
  justify-content: center;
  width: 100%;
  display: flex;
    //justify-content: ${props => props.changeResolution ? 'center' : null};

`;

const Half = styled.div`

`;

const WrapperContentText = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Text = styled.div`

`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

export default Register;

