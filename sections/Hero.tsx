import styled, { keyframes } from "styled-components";
import * as Breakpoints from "../styles/breakpoints";
import Grid from "../components/Grid";
import Column from "../components/Column";
import Lede from "../components/Lede";
import { useRef, useEffect, useState } from "react";
import GlslCanvas from "../lib/GlslCanvas";
import { fadeIn, fadeInLeft } from "../styles/fade";
import ColumnFiller from "../components/ColumnFiller";
import TopNav from "../components/TopNav";
import Header from "../components/Header";

const [width, height] = [864, 182];

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
    const canvas = createCanvas();
    ref.current.querySelector("b").appendChild(canvas);

    // @ts-ignore
    gl = new GlslCanvas(canvas);
    gl.load(fragShader);
    gl.setUniform("u_width", width * 2);
    gl.setUniform("u_height", 182 * 2);
    gl.setUniform("u_texture", "/static/hero-text.png");
  };

  useEffect(() => {
    populate();
  }, []);
  return (
    <Header>
      <TopNav />
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
