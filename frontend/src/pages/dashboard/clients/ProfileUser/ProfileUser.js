import React, {useEffect, useState} from "react";

import styled from "styled-components/macro";

import {useDispatch} from "react-redux";
import {useParams} from "react-router";
import useWindowDimensions from "../../../../helpers/hooks/useWindowDimensions";
import {getUserById, modifyUserById} from "../../../../redux/reducers/userReducer";
import ClientForm from "../ClientForm";
import UserOrders from "../UserOrders";
import {FUCK} from "./chart";
import {ordersAPI} from "../../../../api/ordersAPI";



const ProfileUser = () => {

    const {width} = useWindowDimensions();
    const changeResolution = width < 1214;
    const [userData, setUserData] = useState(null)
    const [userOrders, setUserOrders] = useState(null)
    const dispatch = useDispatch()
    const [openAlert, setOpenAlert] = useState(false)

    const params = useParams()
    const userId = params.id


    useEffect(() => {
        dispatch(getUserById(userId)).then((response) => {
            setUserData(response.data)
        })
        ordersAPI.getUserOrderById(userId).then((response)=>{
            setUserOrders(response.data)
        })
    }, [])

    const modifyUser = (data) => {
        dispatch(modifyUserById(data, userId)).then((response) => {
            if(response.status === 200){
                setOpenAlert(true)
            }
        })
    }


    return (
        <Container changeResolution={changeResolution}>
            <Half changeResolution={changeResolution}>
                <ClientForm userData={userData} modifyUser={modifyUser} openAlert={openAlert} setOpenAlert={setOpenAlert}/>
            </Half>
            <Half changeResolution={changeResolution}>
                <InnerWrapper>
                    <UserOrders userOrders={userOrders} changeResolution={changeResolution}/>
                </InnerWrapper>
                {/*<InnerWrapper>*/}
                {/*    <FUCK/>*/}
                {/*</InnerWrapper>*/}
            </Half>
        </Container>
    )
};

const Container = styled.div`
  align-items: ${props => props.changeResolution ? 'center' : 'flex-start'};
  width: 100%;
  display: flex;
  flex-direction: ${props => props.changeResolution ? 'column' : 'row'};
`;
const Half = styled.div`
  flex-wrap: wrap;
  margin-right: 10px;
  margin-top: ${props => props.changeResolution && '5px'};
  width: ${props => props.changeResolution && '100%'};
  display: flex;
  flex-direction: ${props => props.changeResolution ? 'column' : 'row'};
`;
const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;


export default ProfileUser;