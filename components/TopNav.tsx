import styled from "styled-components";
import Column from "./Column";
import ColumnFiller from "./ColumnFiller";
import Grid from "./Grid";
import { fadeIn, fadeInLeft } from "../styles/fade";
import * as Breakpoints from "../styles/breakpoints";
import scrollToTarget from "../utils/scrollToTarget";
import GLButton from "../components/GLButton";

const Container = styled(Grid)`
  padding-top: 60px;
`;

const Branding = styled.div`
  align-items: center;
  color: inherit;
  display: flex;
  text-decoration: none;
`;

const HeaderLogo = styled.img`
  animation: 1s ${fadeInLeft};
  animation-fill-mode: both;
  margin-right: 20px;
  width: 52px;
`;

const HeaderH1 = styled.h1`
  animation: 1s ${fadeInLeft};
  animation-fill-mode: both;
  animation-delay: 0.5s;
  font-size: 36px;
  font-weight: 400;
  margin: 0 0 -4px;
`;

const HeaderH2 = styled.h2`
  animation: 1s ${fadeInLeft};
  animation-delay: 1s;
  animation-fill-mode: both;
  font-weight: 400;
  margin: 0;
`;

const HeroButton = styled.div`
  animation: 1s ${fadeInLeft};
  animation-fill-mode: both;
  animation-delay: 2s;
  text-align: right;
  width: 100%;

  @media screen and (max-width: ${Breakpoints.M}px) {
    display: none;
  }
`;

const TopNav = () => {
  return (
    <Container>
      <Column width={9} smallWidth={12}>
        <Branding as="a" href="/">
          <HeaderLogo src="/static/logo.png" alt="" />
          <div>
            <HeaderH1>Open Set</HeaderH1>
            <HeaderH2>Software Design + Research</HeaderH2>
          </div>
        </Branding>
      </Column>
      <Column width={3}>
        <ColumnFiller>
          <HeroButton>
            <GLButton
              onClick={e => {
                const a = document.createElement("a");
                a.href = "mailto:hello@openset.tech";
                a.target= "_blank";
                a.click();
              }}
            >
              Say Hi
            </GLButton>
          </HeroButton>
        </ColumnFiller>
      </Column>
    </Container>
  );
};

export default TopNav;
