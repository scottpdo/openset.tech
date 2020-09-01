import { useRef, useEffect } from "react";
import GlslCanvas from "../lib/GlslCanvas";
import styled from "styled-components";
import Column from "./Column";
import Grid from "./Grid";

const scale = 2;

const Container = styled.canvas`
  position: absolute;
  top: 0;
`;

const fragShader = () => {
  return `
    #ifdef GL_ES
    precision highp float;
    #endif

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_height;
    uniform float u_width;
    uniform float u_scale;

    vec4 BLUE = vec4(0.0, 0.0, 1.0, 1.0);
    vec4 WHITE = vec4(1.0);
    vec4 RED = vec4(1.0, 0.0, 0.0, 1.0);

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
      u = smoothstep(0.0, 1.0, f);
  
      // Mix 4 corners percentages
      return mix(a, b, u.x) +
              (c - a)* u.y * (1.0 - u.x) +
              (d - b) * u.x * u.y;
    }

    void main() {
      float nx = floor(gl_FragCoord.x / u_scale);
      float nxt = floor(gl_FragCoord.x / u_scale) - u_time * 10.0;
      float ny = floor(gl_FragCoord.y / u_scale);
      vec2 st = vec2(nx, ny);

      float speed = 1.0;

      float mightChange = pow(noise(vec2(
        nx / (u_width / 6.0) + cos(u_time) * speed, 
        ny / (u_height) + sin(u_time) * speed
      )), 1.0);

      float r = random2(st);
      float r2 = pow(r, 2.0);

      vec4 color = vec4(
        r > mightChange ? BLUE.r : WHITE.r,
        r > mightChange ? BLUE.g : WHITE.g,
        r > mightChange ? BLUE.b : WHITE.b,
        1.0
      );

      // fade out
      if (r < pow((ny - 1.0) / u_height, 1.0)) color = WHITE;

      gl_FragColor = color;

      // gl_FragColor = (nx + ny) / 2.0 == 10.0 ? RED : WHITE;
    }
  `;
};

const GLCA = ({ height = 4 }: { height?: number }) => {
  if (typeof window === "undefined") return null;

  const width = window.innerWidth;

  const ref = useRef();

  useEffect(() => {
    // @ts-ignore
    const canvas = new GlslCanvas(ref.current);
    canvas.load(fragShader());
    canvas.setUniform("u_height", height);
    canvas.setUniform("u_width", width);
    canvas.setUniform("u_scale", scale);
  }, []);

  return (
    <Grid nested>
      <Column width={12} style={{ height: scale * height }}>
        <Container ref={ref} height={scale * height} width={width} />
      </Column>
    </Grid>
  );
};

export default GLCA;
