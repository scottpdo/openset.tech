import { useRef, useEffect } from "react";
import GlslCanvas from "../lib/GlslCanvas";
import styled from "styled-components";
import Column from "./Column";
import Grid from "./Grid";

const scale = 1;

const Container = styled.canvas`
  position: absolute;
  top: 0;
`;

const fragShader = (direction: "up" | "down" | "left" | "right") => {
  return `
    #ifdef GL_ES
    precision highp float;
    #endif

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_height;
    uniform float u_width;

    vec4 BLUE = vec4(0.0, 0.0, 1.0, 1.0);
    vec4 WHITE = vec4(1.0);
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

    bool match(vec4 a, vec4 b) {
      return a.r == b.r && a.g == b.g && a.b == b.b && a.a == b.a;
    }

    void main() {
      float nx = floor(gl_FragCoord.x);
      float nxt = floor(gl_FragCoord.x) - u_time * 10.0;
      float ny = floor(gl_FragCoord.y);
      vec2 st = vec2(nx, ny);

      float speed = 1.0;

      float mightChange = pow(noise(vec2(
        nx / (u_width / 10.0) + cos(u_time) * speed, 
        ny / (u_height) + sin(u_time) * speed
      )), 2.0);

      float r = random2(st);
      float r2 = pow(r, 2.0);

      vec4 color = mix(BLUE, WHITE, 0.5);

      // fade out
      ${
        direction === "left" || direction === "right"
          ? `if (r > smoothstep(0.0, 1.0, ny / (u_height / 4.0)) ||
                 r > smoothstep(0.0, 1.0, (u_height - ny) / (u_height / 4.0)) ) { 
              color = WHITE; 
            }`
          : ""
      }

      gl_FragColor = color;
    }
  `;
};

const GLSwarm = ({
  direction,
  height = 4,
}: {
  direction: "up" | "down" | "left" | "right";
  height?: number;
}) => {
  if (typeof window === "undefined") return null;

  const width = window.innerWidth;

  const ref = useRef();

  useEffect(() => {
    // @ts-ignore
    const canvas = new GlslCanvas(ref.current);
    canvas.load(fragShader(direction));
    canvas.setUniform("u_height", height);
    canvas.setUniform("u_width", width);
  }, []);

  return (
    <Grid nested>
      {direction === "left" && <Column width={4} />}
      <Column width={12} style={{ height }}>
        <Container
          ref={ref}
          style={direction === "right" ? { right: 0 } : {}}
          height={height}
          width={width}
        />
      </Column>
      {direction === "right" && <Column width={4} />}
    </Grid>
  );
};

export default GLSwarm;
