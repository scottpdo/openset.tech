import styled from "styled-components";

const StyledSection = styled.section`
  padding-top: 100px;
  padding-bottom: 100px;

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
