import React from 'react';
import styled from "styled-components/macro";
import VerticalTabs from "../../components/verticalTabs/verticalTabs";

const Dashboard = () => {
    return (
        <Container>
            <Left>
                <VerticalTabs/>
            </Left>
            <Right>
                Правая хуйня
            </Right>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  height: 100px;
`;

const Left = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

const Right = styled.div`
  display: flex;
  flex: 3 1 400px;
`;



export default Dashboard;