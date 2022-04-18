import React from 'react';
import styled from "styled-components/macro";
import DashboardTabs from "../../components/verticalTabs/DashboardTabs";
import NewClientsTable from "./clients/NewClientsTable";



const ClientsPage = () => {

    return (
        <Container>
            <Left>
                <DashboardTabs/>
            </Left>
            <Right>
                <NewClientsTable/>
            </Right>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
`;
const Left = styled.div`
  display: flex;
  flex: 0 1 auto;
`;
const Right = styled.div`
  display: flex;
  flex: 3 1 0;
  max-width: 94%;
`;



export default ClientsPage;