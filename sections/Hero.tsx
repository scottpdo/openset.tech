import styled, { keyframes } from "styled-components";
import * as Breakpoints from "../styles/breakpoints";
import Grid from "../components/Grid";
import Column from "../components/Column";
import Lede from "../components/Lede";
import { useRef, useEffect, useState } from "react";
import GlslCanvas from "../lib/GlslCanvas";
import { fadeIn, fadeInLeft } from "../styles/fade";
import ColumnFiller from "../components/ColumnFiller";
import scrollToTarget from "../utils/scrollToTarget";
import GLButton from "../components/GLButton";

const [width, height] = [864, 182];

const Branding = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding-top: 60px;

  @media screen and (max-width: ${Breakpoints.L}px) {
    padding: 40px 0;
  }

  @media screen and (max-width: ${Breakpoints.M}px) {
    height: 90vh;
  }

  h1,
  h2 {
    margin: 0;
    font-weight: 400;
  }

  h1 {
    font-size: 36px;
    margin-bottom: -4px;
  }

  h2 {
    font-size: 18px;
  }
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
`;

const HeaderH2 = styled.h2`
  animation: 1s ${fadeInLeft};
  animation-delay: 1s;
  animation-fill-mode: both;
`;

const HeroLede = styled(Lede)`
  font-size: 5vw !important;
  line-height: 1.4;
  max-width: none;
  text-align: center;

  & > div {
    animation: 2s ${fadeIn};
    animation-fill-mode: both;
    animation-delay: 0.333s;
  }
`;

const HeroLedeLargeScreen = styled(HeroLede)`
  @media screen and (max-width: ${Breakpoints.M}px) {
    display: none;
  }
`;

const HeroLedeSmallScreen = styled(HeroLede)`
  display: none;
  font-size: 40px !important;
  @media screen and (max-width: ${Breakpoints.M}px) {
    display: block;
  }
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

const fragShader = `
  #ifdef GL_ES
  precision highp float;
  #endif

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform sampler2D u_texture;
  uniform float u_width;
  uniform float u_height;
  uniform vec2 u_mouse;

  vec4 WHITE = vec4(1.0);
  vec4 BLUE = vec4(0.0, 0.0, 1.0, 1.0);
  vec4 RED = vec4(1.0, 0.0, 0.0, 1.0);

  float random(float x) {
    return fract(sin(x) * 100000.0);
  }

  float random2(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random2(i);
    float b = random2(i + vec2(1.0, 0.0));
    float c = random2(i + vec2(0.0, 1.0));
    float d = random2(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f * f * (3.0 - 2.0 * f);
    // u = smoothstep(0.0, 1.0, f);

    // Mix 4 corners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
  }

  // float distance(vec2 a, vec2 b) {
  //   return sqrt(pow(a.x - b.x, 2.0) + pow(a.y - b.y, 2.0));
  // }

  void main() {

    // pixel size
    float scale = 30.0 * pow(abs(cos(u_time / 4.5)), 4.0);

    // transform origin
    float xf = 0.5;
    float yf = -0.8;

    float nx = floor((gl_FragCoord.x - u_width * xf) / scale) * scale / u_resolution.x + xf;
    float ny = floor((gl_FragCoord.y + u_height * yf) / scale) * scale / u_resolution.y - yf;

    vec2 pix = vec2(nx, ny);
    vec4 color = texture2D(u_texture, pix);

    gl_FragColor = color;
  }
`;

const Hero = () => {
  const ref = useRef<HTMLSpanElement>();
  let gl = null;

  const createCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = width * 2;
    canvas.height = height * 2;
    return canvas;
  };

  const populate = () => {
    const bufferCanvas = createCanvas();

    const style = getComputedStyle(ref.current);
    const buffer = bufferCanvas.getContext("2d");
    const fontSize = 131;
    // hard-coded because getComputedStyle doesn't seem to work on iPad???
    buffer.font = `bold ${fontSize}px Yrsa`;
    buffer.fillStyle = "#00f";
    buffer.textAlign = "center";
    buffer.textBaseline = "hanging";
    buffer.fillText("to explore, visualize, and analyze", width, 25);
    buffer.fillText("complex systems", width, 210);

    const dataURL = bufferCanvas.toDataURL();
    const canvas = createCanvas();
    ref.current.querySelector("b").appendChild(canvas);

    canvas.addEventListener("click", () => {
      canvas.width += 10;
    });

    // @ts-ignore
    gl = new GlslCanvas(canvas);
    gl.load(fragShader);
    gl.setUniform("u_width", width * 2);
    gl.setUniform("u_height", 182 * 2);
    gl.setUniform("u_texture", dataURL);
  };

  useEffect(() => {
    // @ts-ignore
    document.fonts.ready.then(() => populate());
  }, []);
  return (
    <Header>
      <Grid>
        <Column width={9} smallWidth={12}>
          <Branding>
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
                // @ts-ignore
                onClick={e => {
                  e.preventDefault();
                  scrollToTarget("#contact");
                }}
              >
                Say Hi
              </GLButton>
            </HeroButton>
          </ColumnFiller>
        </Column>
      </Grid>
      <Grid style={{ flexGrow: 2 }}>
        <Column width={12}>
          <ColumnFiller>
            <HeroLedeLargeScreen as="div">
              Open Set designs and&nbsp;builds&nbsp;software{" "}
              <div>
                <span ref={ref} style={{ display: "block" }}>
                  <b style={{ color: "#fff", display: "inline-block" }}>
                    to explore, visualize, and analyze
                    <br />
                    complex&nbsp;systems
                  </b>
                </span>
              </div>
            </HeroLedeLargeScreen>
            <HeroLedeSmallScreen as="div">
              Open Set designs and builds software to explore, visualize, and
              analyze <b>complex&nbsp;systems</b>
            </HeroLedeSmallScreen>
          </ColumnFiller>
        </Column>
      </Grid>
    </Header>
  );
};

export default Hero;
