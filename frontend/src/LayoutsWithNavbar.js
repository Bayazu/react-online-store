import DashboardTabs from "./components/verticalTabs/DashboardTabs";
import {Outlet} from 'react-router'
import styled from "styled-components/macro";

export default function LayoutsWithNavbar() {
    return (
        <Container>
            <Left>
                <DashboardTabs/>
            </Left>
            <Right>
                <Outlet/>
            </Right>
        </Container>
    );
}

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