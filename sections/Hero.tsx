import styled, { keyframes } from "styled-components";
import * as Breakpoints from "../styles/breakpoints";
import Grid from "../components/Grid";
import Column from "../components/Column";
import Lede from "../components/Lede";
import { useRef, useEffect } from "react";
import GlslCanvas from "../lib/GlslCanvas";

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
  margin-right: 20px;
  width: 52px;
`;

const HeroLede = styled(Lede)`
  max-width: none;
  margin: 180px auto;
  text-align: center;

  @media screen and (max-width: ${Breakpoints.XL}px) {
    margin: 160px auto;
  }

  @media screen and (max-width: ${Breakpoints.L}px) {
    margin: 140px auto;
  }

  @media screen and (max-width: ${Breakpoints.M}px) {
    margin: 120px auto;
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

  vec4 WHITE = vec4(1.0);
  vec4 BLUE = vec4(0.0, 0.0, 1.0, 1.0);

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

  void main() {

    // pixel size
    float scale = 60.0 * pow(abs(cos(u_time / 2.0)), 3.0);
    float xf = 0.5;
    float yf = -0.8;

    float nx = floor((gl_FragCoord.x - u_width * xf) / scale) * scale / u_resolution.x + xf;
    float ny = floor((gl_FragCoord.y + u_height * yf) / scale) * scale / u_resolution.y - yf;

    vec2 pix = vec2(nx, ny);
    vec4 color = texture2D(u_texture, pix);

    gl_FragColor = color;
  }
`;

const fadeInAnim = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FadeIn = styled.span`
  animation: 4s ${fadeInAnim};
  animation-delay: 1s;
  position: relative;
`;

const Hero = () => {
  const ref = useRef<HTMLSpanElement>();

  const createCanvas = (width: number, height: number): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.width = width;
    canvas.height = height;
    return canvas;
  };

  const populate = () => {
    ref.current.innerHTML = "<b style='opacity: 0;'>complex&nbsp;systems</b>";

    const { width, height } = ref.current.getBoundingClientRect();
    const bufferCanvas = createCanvas(width, height);

    const style = getComputedStyle(ref.current);
    const buffer = bufferCanvas.getContext("2d");
    buffer.font = `bold ${style.fontSize} ${style.fontFamily}`;
    buffer.fillStyle = "#00f";
    buffer.textBaseline = "hanging";
    buffer.fillText("complex systems", 0, parseInt(style.fontSize) / 6);

    const dataURL = bufferCanvas.toDataURL();
    const canvas = createCanvas(width, height);
    ref.current.appendChild(canvas);

    // @ts-ignore
    const gl = new GlslCanvas(canvas);
    gl.load(fragShader);
    gl.setUniform("u_width", width);
    gl.setUniform("u_height", height);
    gl.setUniform("u_texture", dataURL);
  };

  const onResize = () => {
    const canvas = ref.current.querySelector("canvas");
    const { width, height } = ref.current.getBoundingClientRect();
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
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
        <Column width={12}>
          <Branding>
            <HeaderLogo src="/static/logo.png" alt="" />
            <div>
              <h1>Open Set</h1>
              <h2>Software Design + Research</h2>
            </div>
          </Branding>
        </Column>
      </Grid>
      <Grid>
        <Column width={12}>
          <HeroLede>
            Open Set designs and builds software{" "}
            <FadeIn>
              to explore, visualize, and analyze{" "}
              <noscript>
                <b>complex&nbsp;systems</b>
              </noscript>
              <span ref={ref} />
            </FadeIn>
          </HeroLede>
        </Column>
      </Grid>
    </Header>
  );
};

export default Hero;
