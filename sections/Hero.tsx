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
  margin-top: 60px;

  @media screen and (max-width: ${Breakpoints.L}px) {
    margin: 40px auto;
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
  margin: 180px auto;
  text-align: center;

  & > div {
    animation: 2s ${fadeIn};
    animation-fill-mode: both;
    animation-delay: 0.1s;
  }

  @media screen and (max-width: ${Breakpoints.XL}px) {
    margin: 135px auto;
  }

  @media screen and (max-width: ${Breakpoints.L}px) {
    margin: 120px auto;
  }

  @media screen and (max-width: ${Breakpoints.M}px) {
    margin: 100px auto;
  }
`;

const fragShader = `
  #ifdef GL_ES
  precision mediump float;
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
    buffer.font = `bold ${fontSize}px ${style.fontFamily}`;
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

  const onResize = () => {
    // const canvas = ref.current.querySelector("canvas");
    // const { width, height } = canvas.parentElement.getBoundingClientRect();
    // gl.setUniform("u_width", width);
    // gl.setUniform("u_height", height);
    // while (canvas.width > 2 * width) {
    //   console.log(canvas.width);
    //   canvas.width -= 1;
    // }
    // console.log(canvas.width, width);
    // canvas.width = width;
    // console.log(canvas.width);
    // canvas.height = height;
    // canvas.style.width = width + "px";
    // canvas.style.height = height + "px";
  };

  useEffect(() => {
    populate();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <Header>
      <Grid>
        <Column width={10}>
          <Branding>
            <HeaderLogo src="/static/logo.png" alt="" />
            <div>
              <HeaderH1>Open Set</HeaderH1>
              <HeaderH2>Software Design + Research</HeaderH2>
            </div>
          </Branding>
        </Column>
        <Column width={2}>
          <ColumnFiller>
            <div style={{ textAlign: "right", width: "100%" }}>
              <GLButton
                // @ts-ignore
                onClick={e => {
                  e.preventDefault();
                  scrollToTarget("#contact");
                }}
                small
              >
                Say Hi
              </GLButton>
            </div>
          </ColumnFiller>
        </Column>
      </Grid>
      <Grid>
        <Column width={12}>
          <HeroLede as="div">
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
          </HeroLede>
        </Column>
      </Grid>
    </Header>
  );
};

export default Hero;
