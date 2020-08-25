/// <reference path="../types/global.d.ts" />

import Wrapper from "../components/Wrapper";
import CA from "../components/CA";
import About from "../sections/About";
import Work from "../sections/Work";
import Who from "../sections/Who";
import Contact from "../sections/Contact";
import Hero from "../sections/Hero";
import { useEffect } from "react";

const Index = () => {
  const onMouseMove = (e: MouseEvent) => {
    if (!window.__GLOBAL_CURSOR)
      window.__GLOBAL_CURSOR = { x: -9999, y: -9999 };
    const cursor = window.__GLOBAL_CURSOR;
    cursor.x = e.pageX;
    cursor.y = e.pageY - window.scrollY;
  };
  useEffect(() => {
    document.body.addEventListener("mousemove", onMouseMove);
    return () => {
      document.body.removeEventListener("mousemove", onMouseMove);
    };
  }, []);
  return (
    <>
      <Wrapper>
        <CA direction="down" height={5} />
        <Hero />
        <CA direction="left" />
        <About />
        <CA direction="right" />
        <Work />
        <CA direction="left" />
        <Who />
        <CA direction="right" />
        <Contact />
        <CA direction="up" height={6} />
      </Wrapper>
    </>
  );
};

export default Index;
