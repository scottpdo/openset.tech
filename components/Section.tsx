import styled from "styled-components";
import * as Breakpoints from "../styles/breakpoints";
import { useState, useEffect, useRef } from "react";
import inViewport from "../utils/inViewport";
import SectionTitle from "./SectionTitle";

const StyledSection = styled.section<{ blue: boolean; first: boolean }>`
  background: ${props => (props.blue ? "#00f" : "transparent")};
  color: ${props => (props.blue ? "#fff" : "#424242")};
  padding-top: ${props => (props.blue ? 120 : props.first ? 0 : 120)}px;
  padding-bottom: 120px;

  &:before,
  &:after {
    content: "";
    display: ${props => (props.blue ? "block" : "none")};
    height: 100%;
    width: 20px;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;

    @media screen and (max-width: ${Breakpoints.S}px) {
      display: none;
    }

    @media screen and (min-width: ${Breakpoints.XL}px) {
      width: 40px;
    }
  }

  &:after {
    left: unset;
    right: 0;
  }

  & > div {
    transition: 0.8s opacity, 0.8s transform;
  }

  a {
    color: ${props => (props.blue ? "#fff" : "#00f")};
  }

  @media screen and (max-width: ${Breakpoints.L}px) {
    padding-top: ${props => (props.blue ? 100 : props.first ? 0 : 100)}px;
    padding-bottom: 100px;
  }

  @media screen and (max-width: ${Breakpoints.M}px) {
    padding-top: ${props => (props.blue ? 80 : props.first ? 0 : 80)}px;
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
    ${props => !props.blue && "margin-top: 0;"}
  }

  ${SectionTitle} {
    color: ${props => (props.blue ? "#fff" : "#424242")};
  }
`;

const Section = ({
  blue = false,
  dir = "left",
  children,
  first = false,
}: {
  blue?: boolean;
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
    <StyledSection blue={blue} dir={dir} first={first} ref={ref}>
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transform: `translateX(${loaded ? 0 : dir === "left" ? 40 : -40}px)`,
        }}
      >
        {children}
      </div>
    </StyledSection>
  );
};

export default Section;
