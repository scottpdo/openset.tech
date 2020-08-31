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
import GLSwarm from "../components/GLSwarm";

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
        {/* <GLCA direction="down" height={21} /> */}
        <Hero />
        {/* <GLSwarm direction="left" height={42} /> */}
        <About />
        {/* <GLCA direction="left" height={42} /> */}
        <Work />
        {/* <GLCA direction="left" height={42} /> */}
        <Who />
        {/* <GLCA direction="left" height={42} /> */}
        <Contact />
        {/* <GLCA direction="up" height={21} /> */}
      </Wrapper>
    </>
  );
};

export default Index;
