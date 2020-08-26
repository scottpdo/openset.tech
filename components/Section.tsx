import styled from "styled-components";
import * as Breakpoints from "../styles/breakpoints";

const StyledSection = styled.section`
  padding-top: 100px;
  padding-bottom: 100px;

  @media screen and (max-width: ${Breakpoints.L}px) {
    padding-top: 80px;
    padding-bottom: 80px;
  }

  & > *:first-child,
  & > *:first-child > *:first-child,
  & > *:first-child > *:first-child > *:first-child {
    margin-top: 0;
  }

  & > *:last-child,
  & > *:last-child > *:last-child,
  & > *:last-child > *:last-child > *:last-child {
    margin-bottom: 0;
  }

  & + section {
    padding-top: 0;
  }
`;

const Section = ({ children }: { children: any }) => (
  <StyledSection>{children}</StyledSection>
);

export default Section;
