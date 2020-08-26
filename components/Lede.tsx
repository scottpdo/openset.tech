import styled from "styled-components";
import * as Breakpoints from "../styles/breakpoints";

const Lede = styled.p<{ sub?: boolean }>`
  font-size: ${props => (props.sub ? 56 : 72)}px;
  line-height: 1.2;
  max-width: 980px;

  b {
    color: #00f;
  }

  @media screen and (max-width: ${Breakpoints.XL}px) {
    font-size: ${props => (props.sub ? 48 : 64)}px;
  }

  @media screen and (max-width: ${Breakpoints.L}px) {
    font-size: ${props => (props.sub ? 36 : 54)}px;
  }

  @media screen and (max-width: ${Breakpoints.M}px) {
    font-size: ${props => (props.sub ? 32 : 44)}px;
  }

  @media screen and (max-width: ${Breakpoints.S}px) {
    font-size: ${props => (props.sub ? 28 : 36)}px;
  }
`;

export default Lede;
