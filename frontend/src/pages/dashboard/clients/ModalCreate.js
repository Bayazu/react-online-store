import React from 'react';
import styled from "styled-components/macro";
import {Alert, Stack,} from "@mui/material";
import {useForm} from 'react-hook-form'
//TODO Удалить за ненадобностью
const Register = (props) => {
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

    const onSubmit = async (data) => {
        props.createUserSubmit(data).then((response) => {
            if (response.status === 200) {
                reset()
            }
        })
    }

    return (
        <AnotherCont>
            <Stack sx={{width: '100%', position: 'absolute'}} spacing={2}>
                {errors?.username && <Alert severity="error">{errors?.username.message}</Alert>}
                {errors?.password && <Alert severity="error">Пароль должен иметь от 4 до 10 символов</Alert>}
                {errors?.firstName && <Alert severity="error">{errors?.firstName.message}</Alert>}
                {errors?.secondName && <Alert severity="error">{errors?.secondName.message}</Alert>}
                {errors?.country && <Alert severity="error">{errors?.country.message}</Alert>}
                {errors?.apartment && <Alert severity="error">{errors?.apartment.message}</Alert>}
                {errors?.building && <Alert severity="error">{errors?.building.message}</Alert>}
                {errors?.street && <Alert severity="error">{errors?.street.message}</Alert>}
                {errors?.city && <Alert severity="error">{errors?.city.message}</Alert>}
            </Stack>
            <ContainerForm>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormWrapper>
                        <InputWrapper>
                            <label>
                                {/*Валидацие не пустая*/}
                                Имя пользователя:
                                <input
                                    {...register('username', {
                                            required: "Поле `Имя пользователя` обязательно к заполнению"
                                        }
                                    )}
                                />
                            </label>
                        </InputWrapper>

                        <InputWrapper>
                            <label>
                                Имя:
                                <input
                                    {...register('firstName', {
                                            required: "Поле обязательно к заполнению"
                                        }
                                    )}
                                />
                            </label>
                        </InputWrapper>

                        <InputWrapper>
                            <label>
                                Фамилия:
                                <input
                                    {...register('secondName', {
                                            required: "Поле обязательно к заполнению"
                                        }
                                    )}
                                />
                            </label>
                        </InputWrapper>

                        <InputWrapper>
                            <label>
                                E-mail:
                                <input
                                    type="email"
                                    {...register('email', {
                                            required: "Поле обязательно к заполнению",
                                            // pattern: /^\S+@\S+$/i
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

                        <InputWrapper>
                            <label>
                                Страна:
                                <input
                                    {...register('country', {
                                            required: "Поле обязательно к заполнению"
                                        }
                                    )}
                                />
                            </label>
                        </InputWrapper>

                        <InputWrapper>
                            <label>
                                Город:
                                <input
                                    {...register('city', {
                                            required: "Поле обязательно к заполнению"
                                        }
                                    )}
                                />
                            </label>
                        </InputWrapper>

                        <InputWrapper>
                            <label>
                                Улица:
                                <input
                                    type="street"
                                    {...register('street', {
                                            required: "Поле обязательно к заполнению"
                                        }
                                    )}
                                />
                            </label>
                        </InputWrapper>

                        <InputWrapper>
                            <label>
                                Дом:
                                <input
                                    type="building"
                                    {...register('building', {
                                            required: "Поле обязательно к заполнению"
                                        }
                                    )}
                                />
                            </label>
                        </InputWrapper>

                        <InputWrapper>
                            <label>
                                Квартира:
                                <input
                                    {...register('apartment', {
                                            required: "Поле обязательно к заполнению"
                                        }
                                    )}
                                />
                            </label>
                        </InputWrapper>
                    </FormWrapper>
                    <input type="submit"/>
                </form>
            </ContainerForm>
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
`;
const AnotherCont = styled.div`
  //display: flex;
  //justify-content: center;
  //margin-top: 25px;
`;

const FormWrapper = styled.div`
  margin-top: 35px;
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


export default Register;