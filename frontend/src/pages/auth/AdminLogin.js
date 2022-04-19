import React, {useState} from 'react';
import styled from "styled-components/macro";
import {Alert, Stack} from "@mui/material";
import {useForm} from 'react-hook-form'
import {useDispatch} from "react-redux";
import {loginAdmin, loginUser} from "../../redux/reducers/userReducer";
import {useNavigate} from "react-router-dom";

import Button from "@mui/material/Button";
import Modal from "../../components/modal/Modal";

const LoginForm = () => {
    const {
        register,
        formState: {
            errors
        },
        reset,
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    })

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [modalActive, setModalActive] = useState(false)


    const onSubmit = (data) => {
        dispatch(loginAdmin(data)).then((response) => {
            if (response.status === 400) {
                setModalActive(true)
            }else{
                navigate("/clients/");
            }
        })
    }

    return (
        <AnotherCont>
            <ContainerForm>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack sx={{width: '100%'}} spacing={2}>
                        {errors?.password && <Alert severity="error">Пароль должен иметь от 4 до 10 символов</Alert>}
                    </Stack>
                    <FormWrapper>
                        <InputWrapper>
                            <label>
                                Логин:
                                <input
                                    type="username"
                                    {...register('username', {
                                            required: "Поле обязательно к заполнению",
                                        }
                                    )}
                                />
                            </label>
                        </InputWrapper>

                        <InputWrapper>
                            {/*Пароль минимум 4 максимум 10*/}
                            <label>
                                Пароль:
                                <input
                                    {...register('password', {
                                            required: true,
                                            minLength: 4, maxLength: 10
                                        }
                                    )}
                                />
                            </label>
                        </InputWrapper>


                    </FormWrapper>
                    <input type="submit"/>

                </form>

            </ContainerForm>

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
        </AnotherCont>

    );
};

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

const InputWrapper = styled.div`
  display: flex;
  padding: 10px;
`;
const AnotherCont = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

const FormWrapper = styled.div`
  border-radius: 1%;
  background: #ecf2f5;
  box-shadow: 0 0 3px rgb(0 0 0 / 50%);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-around;
`;

const ContainerForm = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;


  .form {
    display: flex !important;
    background: #0e101c;
    max-width: 800px;
    margin: 0 auto;
  }

  p {
    color: #bf1650;
  }

  p::before {
    display: inline;
    content: "⚠ ";
  }

  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    border: 1px solid white;
    padding: 10px 15px;
    margin-bottom: 10px;
    font-size: 14px;
  }

  label {
    line-height: 2;
    text-align: left;
    display: block;
    margin-bottom: 13px;
    margin-top: 20px;
    color: black;
    font-size: 14px;
    font-weight: 200;
  }

  button[type="submit"],
  input[type="submit"] {
    background: #aecdf2;
    color: black;
    text-transform: uppercase;
    border: none;
    margin-top: 40px;
    padding: 20px;
    font-size: 16px;
    font-weight: 100;
    letter-spacing: 10px;
  }

  button[type="submit"]:hover,
  input[type="submit"]:hover {
    background: #1976d2;
  }

  button[type="submit"]:active,
  input[type="button"]:active,
  input[type="submit"]:active {
    transition: 0.3s all;
    transform: translateY(3px);
    border: 1px solid transparent;
    opacity: 0.8;
  }

  input:disabled {
    opacity: 0.4;
  }

  input[type="button"]:hover {
    transition: 0.3s all;
  }

  button[type="submit"],
  input[type="button"],
  input[type="submit"] {
    -webkit-appearance: none;
  }

  button[type="button"] {
    display: block;
    appearance: none;
    background: #333;
    color: white;
    border: none;
    text-transform: uppercase;
    padding: 10px 20px;
    border-radius: 4px;
  }

  hr {
    margin-top: 30px;
  }

  button {
    display: block;
    appearance: none;
    margin-top: 40px;
    border: 1px solid #333;
    margin-bottom: 20px;
    text-transform: uppercase;
    padding: 10px 20px;
    border-radius: 4px;
  }
`;


export default LoginForm;