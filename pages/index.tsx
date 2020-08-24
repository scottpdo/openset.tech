import Wrapper from "../components/Wrapper";
import styled, { css, keyframes } from "styled-components";
import { Environment, Terrain, CanvasRenderer } from "flocc";
import { useEffect, useRef, useState } from "react";
import Grid from "../components/Grid";
import Column from "../components/Column";
import CA from "../components/CA";
import { M as BREAKPOINT_M } from "../styles/breakpoints";
import About from "../sections/About";

const VCenter = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.header`
  margin-top: 60px;

  h1,
  h2 {
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    font-weight: 400;
  }

  h1 {
    font-size: 72px;
  }

  h2 {
    font-size: 28px;
    @media screen and (min-width: ${BREAKPOINT_M}px) {
      text-align: right;
    }
  }
`;

const HeaderLogo = styled.img`
  height: auto;
  margin-right: 30px;
  width: 76px;
`;

const Lede = styled.p`
  font-size: 36px;
  max-width: 710px;
  margin: 60px auto;
  text-align: center;
  b {
    color: #00f;
  }
`;

const Index = () => {
  return (
    <>
      <Wrapper>
        <CA direction="down" />
        <Header>
          <Grid>
            <Column width={6}>
              <VCenter>
                <div>
                  <HeaderLogo src="/static/logo.png" alt="" />
                  <h1>Open Set</h1>
                </div>
              </VCenter>
            </Column>
            <Column width={6}>
              <VCenter>
                <h2>Software Design + Research</h2>
              </VCenter>
            </Column>
            <Column width={2} />
            <Column width={8}>
              <Lede>
                Open Set designs and builds software to explore, visualize, and
                analyze <b>complex systems</b>.
              </Lede>
            </Column>
          </Grid>
        </Header>
        <CA direction="left" />
        <About />
        <CA direction="right" />
      </Wrapper>
    </>
  );
};

export default Index;
