import styled from "styled-components";
import * as Breakpoints from "../styles/breakpoints";
import Lede from "./Lede";

const SectionTitle = styled.h3`
  &:after {
    content: "—";
  }
  color: #888;
  margin-top: 0;

  @media screen and (max-width: ${Breakpoints.XL}px) {
    font-size: 32px;
  }

  @media screen and (max-width: ${Breakpoints.L}px) {
    font-size: 28px;
  }

  @media screen and (max-width: ${Breakpoints.M}px) {
    font-size: 24px;
  }

  @media screen and (max-width: ${Breakpoints.S}px) {
    font-size: 22px;
  }

  & + ${Lede} {
    margin-top: 0;
  }
`;

export default SectionTitle;
