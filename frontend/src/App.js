import Pages from "./pages/Pages";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Search from "./components/Search";
import MyToolBar from "./components/ToolBar"


function App() {

  return (
    <div className="App" enablertl="true">
      <BrowserRouter>
        <Nav>
          <Logo to={'/'}>
            <img src={require('./images/logo.png')} alt="logo"></img>
          </Logo>
          <MyToolBar/>
          <Search/>
        </Nav>
        <Pages/>
      </BrowserRouter>
    </div>
  );
}
const Logo = styled(Link)`
  img{
    width: 100%;
  }
 `;
const Nav = styled.div`
  display: grid;
  justify-content: flex-start;
  align-items: center;
  svg {
    font-size: 2rem;
  }
`;
export default App;
