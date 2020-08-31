/// <reference path="../types/global.d.ts" />
import Head from "next/head";
import Sanitize from "../styles/sanitize";
import Global from "../global";
import styled from "styled-components";
import { useEffect } from "react";

const StyledWrapper = styled.div``;

const Content = styled.div``;

const Wrapper = ({ children }) => {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    // @ts-ignore
    gtag("js", new Date());
    // @ts-ignore
    gtag("config", "UA-176828735-1");
  }, []);

  return (
    <StyledWrapper>
      <Head>
        <title>Open Set</title>
        <link rel="shortcut icon" href="/static/openset-favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Yrsa:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-176828735-1"
        ></script>
      </Head>
      <Sanitize />
      <Global />
      <Content>{children}</Content>
    </StyledWrapper>
  );
};

export default Wrapper;
