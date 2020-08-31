import styled from "styled-components";
import * as Breakpoints from "../styles/breakpoints";
import { useState, useEffect, useRef } from "react";
import inViewport from "../utils/inViewport";

const StyledSection = styled.section<{ first: boolean }>`
  padding-top: ${props => (props.first ? 0 : 100)}px;
  padding-bottom: 100px;
  transition: 0.8s opacity, 0.8s transform;

  @media screen and (max-width: ${Breakpoints.L}px) {
    padding-top: ${props => (props.first ? 0 : 80)}px;
    padding-bottom: 80px;
  }

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

const Section = ({
  dir = "left",
  children,
  first = false,
}: {
  dir?: "right" | "left";
  children: any;
  first?: boolean;
}) => {
  const [loaded, setLoaded] = useState(true);
  const ref = useRef<HTMLDivElement>();
  const onScroll = () => {
    if (inViewport(ref, 0.25)) setLoaded(true);
  };
  useEffect(() => {
    setLoaded(false);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });
  return (
    <StyledSection
      dir={dir}
      first={first}
      ref={ref}
      style={{
        opacity: loaded ? 1 : 0,
        transform: `translateX(${loaded ? 0 : dir === "left" ? 40 : -40}px)`,
      }}
    >
      {children}
    </StyledSection>
  );
};

export default Section;
