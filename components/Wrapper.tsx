/// <reference path="../types/global.d.ts" />
import Head from "next/head";
import Sanitize from "../styles/sanitize";
import Global from "../global";
import styled from "styled-components";
import { useEffect } from "react";

const StyledWrapper = styled.div``;

const Content = styled.div``;

const Wrapper = ({
  children,
  title = "",
  description = "Open Set designs and builds software to explore, visualize, and analyze complex systems."
}) => {
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
        <title>{title ? title + " | " : ""}Open Set</title>
        <meta
          name="og:title"
          content={`${title ? title + " | " : ""}Open Set`}
        />
        <link
          rel="shortcut icon"
          href={
            (process.env.URL || "https://openset.tech") +
            "/static/openset-favicon.png"
          }
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Yrsa:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-176828735-1"
        ></script>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta
          name="og:image"
          content={
            (process.env.URL || "https://openset.tech") + "/static/og.png"
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Sanitize />
      <Global />
      <Content>{children}</Content>
    </StyledWrapper>
  );
};

export default Wrapper;
