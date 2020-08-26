/// <reference path="../types/global.d.ts" />

import Wrapper from "../components/Wrapper";
import CA from "../components/CA";
import About from "../sections/About";
import Work from "../sections/Work";
import Who from "../sections/Who";
import Contact from "../sections/Contact";
import Hero from "../sections/Hero";
import { useEffect } from "react";
import GLCA from "../components/GLCA";

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
        <GLCA direction="down" height={7} />
        <Hero />
        <GLCA direction="left" />
        <About />
        <GLCA direction="right" />
        <Work />
        <GLCA direction="left" />
        <Who />
        <GLCA direction="right" />
        <Contact />
        <GLCA direction="up" height={7} />
      </Wrapper>
    </>
  );
};

export default Index;
