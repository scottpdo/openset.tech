import Head from "next/head";
import Sanitize from "../styles/sanitize";
import Global from "../global";
import styled from "styled-components";

const StyledWrapper = styled.div``;

const Content = styled.div``;

const Wrapper = ({ children }) => (
  <StyledWrapper>
    <Head>
      <title>Open Set</title>
      <link rel="shortcut icon" href="/static/openset-favicon.png" />
      <link
        href="https://fonts.googleapis.com/css2?family=Yrsa:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Sanitize />
    <Global />
    <Content>{children}</Content>
  </StyledWrapper>
);

export default Wrapper;
