import React, {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import styled from "styled-components/macro";
import {Alert, Paper, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import HeaderText from "../../components/HeaderText";
import Input from "../../components/controls/Input";
import useWindowDimensions from "../../helpers/hooks/useWindowDimensions";
import CustomButton from "../../components/controls/Button";
import LoginIcon from '@mui/icons-material/Login';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginAdmin, loginUser} from "../../redux/reducers/userReducer";
import Modal from "../../components/modal/Modal";
import Button from "@mui/material/Button";

//TODO adminLogin и Login впринципе ничем не отличаются, можно объединить в 1 компонент

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [modalActive, setModalActive] = useState(false)
    const {width} = useWindowDimensions();
    const changeResolution = width < 1214;


    const {
        register, formState: {
            errors
        }, reset, handleSubmit, control
    } = useForm({
        defaultValues: {
            username: '', password: ''
        }, mode: "onBlur"
    })


        const onSubmit = (data) => {
        dispatch(loginUser(data)).then((response) => {
            if (response.status === 400) {
                setModalActive(true)
            }else{
                navigate("/items");
            }
        })
    }


    return (<Container changeResolution={changeResolution}>
        <Box component={Paper} sx={{padding: 2, minWidth: 0, width: changeResolution ? '100%' : null}}>
            <Stack sx={{width: '100%'}} spacing={2}>
                {errors?.password && <Alert severity="error">Пароль должен иметь от 4 до 10 символов</Alert>}
            </Stack>
            <Half changeResolution={changeResolution}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <HeaderText text={'Логин'} padding={'0px 0px 0px 25px'}/>
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
                    </Wrapper>
                    <HeaderText text={'Пароль'} padding={'0px 0px 0px 25px'}/>
                    <Wrapper changeResolution={changeResolution}>
                        <InputWrapper changeResolution={changeResolution}>
                            <Controller
                                render={({field}) => <Input
                                    label='Пароль'
                                    {...field}
                                />}
                                rules={{minLength: 4, maxLength: 10, required: true}}
                                name="password"
                                control={control}
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
                        {/*        text={'Удалить пользователя'}*/}
                        {/*        {...field}*/}
                        {/*    />}*/}
                        {/*    name="textField"*/}
                        {/*    control={control}*/}
                        {/*/>*/}
                        <Controller
                            render={({field}) => <CustomButton
                                startIcon={<LoginIcon/>}
                                type="submit"
                                variant='outlined'
                                sx={{
                                    margin: 'spacing(0.5)', color: "#1976d2", right: '10px',
                                }}
                                text={'Авторизоваться'}
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
                        Вы неверно ввели логин или пароль
                    </Text>
                </WrapperContentText>
                <ButtonWrapper>
                    <Button
                        variant="contained"
                        onClick={() => (setModalActive(false))}>Ок
                    </Button>
                </ButtonWrapper>

            </Modal>
        </Box>
    </Container>);
};

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;
  margin-right: 5px;
  flex-direction: ${props => props.changeResolution ? 'column' : 'row'};
}
`;
const Wrapper = styled.div`
  justify-content: center;
  display: flex;
  padding: 10px;
  flex-direction: ${props => props.changeResolution ? 'column' : 'row'};
`;

const WrapperButtons = styled.div`
  display: flex;
  justify-content: flex-end;
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
  min-width: ${props => props.changeResolution ? null : '460px'};
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const WrapperContentText = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Text = styled.div`

`;

export default Login;

