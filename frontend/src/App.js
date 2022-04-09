import styled from 'styled-components/macro'
import Items from "./pages/Items/Items";
import NavBar from "./components/navBar/NavBar";

function App() {
  return (
    <AppMain>
      <NavBar/>
        <Items/>
    </AppMain>
  );
}

const AppMain = styled.div`

`;

export default App;
