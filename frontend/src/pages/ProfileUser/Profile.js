import React, {useEffect, useState} from "react";
import ClientForm from "../dashboard/clients/ClientForm";
import UserOrders from "../dashboard/clients/UserOrders";
import styled from "styled-components/macro";
import useWindowDimensions from "../../helpers/hooks/useWindowDimensions";
import {
    getProfileData,
    getUserById,
    getUserOrdersByToken,
    modifyUserById,
    modifyUserByToken
} from "../../redux/reducers/userReducer";
import {useDispatch} from "react-redux";
import {useParams} from "react-router";


const Profile = () => {

    const {width} = useWindowDimensions();
    const changeResolution = width < 1214;
    const [userData, setUserData] = useState(null)
    const [userOrders, setUserOrders] = useState(null)
    const dispatch = useDispatch()
    const [openAlert, setOpenAlert] = useState(false)

    const params = useParams()
    const userId = params.id


    useEffect(() => {
        dispatch(getProfileData()).then((response) => {
            setUserData(response.data.emailValidation)
        })
    }, [])


    const modifyUser = (data) => {
        dispatch(modifyUserByToken(data)).then((response) => {
            if (response.status === 200) {
                setOpenAlert(true)
            }
        })
    }

    useEffect(() => {
        dispatch(getUserOrdersByToken()).then((response) => {
            if (response.status === 200) {
                setUserOrders(response.data)
            }
        })
    }, [])

    return (
        <Container changeResolution={changeResolution}>
            <Half changeResolution={changeResolution}>
                <ClientForm userData={userData} openAlert={openAlert} setOpenAlert={setOpenAlert}
                            modifyUser={modifyUser}/>
            </Half>
            <Half changeResolution={changeResolution}>
                <InnerWrapper>
                    <UserOrders userOrders={userOrders} changeResolution={changeResolution}/>
                </InnerWrapper>
            </Half>
        </Container>
    )
};

const Container = styled.div`
  padding: 25px;
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


export default Profile;