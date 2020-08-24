import styled from "styled-components";

const StyledSiteTitle = styled.h1`
  display: inline-block;
  font-size: 84px;
  line-height: 1;
  margin: 0;

  span {
    border-bottom: 1px solid;
    position: absolute;
    bottom: 0.2em;
    left: 0;
    width: 100%;

    & + span {
      bottom: 0.15em;
      opacity: 0.8;
      & + span {
        bottom: 0.1em;
        opacity: 0.6;
        & + span {
          bottom: 0.05em;
          opacity: 0.4;
          & + span {
            bottom: 0;
            opacity: 0.2;
          }
        }
      }
    }
  }
`;

export default ({ children, props }: { children; props?: any }) => (
  <StyledSiteTitle {...props}>
    {children}
    <span />
    <span />
    <span />
    <span />
    <span />
  </StyledSiteTitle>
);
