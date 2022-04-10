import React, {useState} from 'react';
import styled from "styled-components/macro";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {useForm} from 'react-hook-form'
import "./styleRegister.css"
import axios from "axios";

const Register = () => {

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

    const onSubmit = (data) => {

        instance.post('user/registration', {data})
            .then(function (response) {
                return response
            })
            .catch(function (error) {
                console.log(error);
            })

       // reset()

    }
    const instance = axios.create({
        baseURL: 'http://localhost:8080/api/',
    });





    return (
        <AnotherCont>
        <ContainerForm>
            {/*<h1>React Hook Form</h1>*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormWrapper>
                    <InputWrapper>
                        <label>
                            Имя пользователя:
                            <input
                                {...register('username', {
                                        required: "Поле обязательно к заполнению"
                                    }
                                )}
                            />
                        </label>
                        {/*TODO вывести в алерт*/}
                        {/*<div>*/}
                        {/*    {errors?.firstName && <p>{errors?.firstName?.message || "Error!"}</p>}*/}
                        {/*</div>*/}
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
                                {...register('email', {
                                        required: "Поле обязательно к заполнению"
                                    }
                                )}
                            />
                        </label>
                    </InputWrapper>

                    <InputWrapper>
                        <label>
                            Пароль:
                            <input
                                {...register('password', {
                                        required: "Поле обязательно к заполнению"
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

const InputWrapper = styled.div`
  display: flex;
`;
const AnotherCont = styled.div`
  display: flex;
  justify-content: center;
`;

const FormWrapper = styled.div`
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