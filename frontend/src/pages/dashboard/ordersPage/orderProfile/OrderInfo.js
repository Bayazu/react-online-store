import React from 'react';
import Box from "@mui/material/Box";
import TableOrderProfile from "./TableOrderProfile";
import SelectStatuses from "./SelectStatuses";
import CustomButton from "../../../../components/controls/Button";
import SaveIcon from "@mui/icons-material/Save";
import styled from "styled-components/macro";
import ActionAlert from "../../../../components/alert/ActionAlert";

const OrderInfo = (props) => {
    const {
        currentStatus,
        orderData,
        setCurrentStatus,
        openAlert,
        setOpenAlert,
        userRole,
        changeStatus = () => {
        },
    } = props

    console.log(userRole);
    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 1,
                p: 2,
                minWidth: 0,
                margin: '5px',
                width: '900px' || null,

            }}
        >
            <ActionAlert openAlert={openAlert} setOpenAlert={setOpenAlert} text={'Статус заказа успешно завершён'}/>
            <Box
                sx={{color: 'success.primary', fontSize: 34, verticalAlign: 'medium', marginBottom: '10px'}}>Заказ</Box>

            <Box sx={{
                color: 'text.primary',
                fontSize: 34,
                fontWeight: 'medium',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <TableOrderProfile orderData={orderData}/>
                <Box sx={{color: 'success.dark', fontSize: 54, verticalAlign: 'medium'}}/>
            </Box>
            {userRole === 'ADMIN'
                ? <StatusWrapper>
                    <SelectStatuses currentStatus={currentStatus} setCurrentStatus={setCurrentStatus}/>
                    <CustomButton
                        startIcon={<SaveIcon/>}
                        type="submit"
                        variant='outlined'
                        onClick={() => changeStatus()}
                        sx={{
                            color: "#1976d2",
                            height: "50px",
                        }}
                        text={'Сохранить'}
                    />
                </StatusWrapper>
                : null
            }
        </Box>
    );
};

const StatusWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 6px 0 0;
  align-items: center;
`;

export default OrderInfo;