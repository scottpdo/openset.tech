import styled from "styled-components";
import * as Breakpoints from "../styles/breakpoints";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  @media screen and (max-width: ${Breakpoints.L}px) {
    padding: 40px 0;
  }

  @media screen and (max-width: ${Breakpoints.M}px) {
    height: 90vh;
  }
`;

export default Header;
