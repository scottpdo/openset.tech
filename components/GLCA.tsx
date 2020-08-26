import { useRef, useEffect } from "react";
import GlslCanvas from "../lib/GlslCanvas";
import styled from "styled-components";
import Column from "./Column";
import Grid from "./Grid";

const scale = 6;

const Container = styled.canvas`
  position: absolute;
  top: 0;
`;

const fragShader = (direction: "up" | "down" | "left" | "right") => {
  return `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_height;
    uniform float u_width;
    uniform float u_scale;

    float speed = 15.0;

    vec4 BLUE = vec4(0.0, 0.0, 1.0, 1.0);
    vec4 WHITE = vec4(1.0);
    vec4 RED = vec4(1.0, 0.0, 0.0, 1.0);

    float random(float x) {
      return fract(sin(x) * 100000.0);
    }

    float random2(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      float nx = floor(gl_FragCoord.x / u_scale);
      float nxt = floor(gl_FragCoord.x / u_scale ${
        direction === "left" ? "+" : "-"
      } floor(u_time * speed));
      float ny = floor(gl_FragCoord.y / u_scale);
      float nyt = floor(gl_FragCoord.y / u_scale ${
        direction === "down" ? "+" : "-"
      } floor(u_time * speed));

      vec2 st = vec2(${
        direction === "up" || direction === "down" ? "nx" : "nxt"
      }, ${direction === "left" || direction === "right" ? "ny" : "nyt"});
      vec4 color = random2(st) > 0.333 ? BLUE : WHITE;

      if (random2(vec2(-nxt, -nyt)) > 0.95) {
          color = color.r == BLUE.r && color.g == BLUE.g && color.b == BLUE.b ? WHITE : BLUE;
      }

      // fade out
      ${
        direction === "down"
          ? `if (random2(st) > pow((ny + 1.0) / u_height, 0.5)) color = WHITE;`
          : ""
      }
      ${
        direction === "up"
          ? `if (random2(st) < pow((ny - 1.0) / u_height, 0.5)) color = WHITE;`
          : ""
      }
      ${
        direction === "left"
          ? `if (random2(st) > pow(nx / 50.0, 0.5)) color = WHITE;`
          : ""
      }
      ${
        direction === "right"
          ? `if (random2(st) < pow(nx / (u_width / u_scale), 2.0)) color = WHITE;`
          : ""
      }

      gl_FragColor = color;
    }
  `;
};

const GLCA = ({
  direction,
  height = 4,
}: {
  direction: "up" | "down" | "left" | "right";
  height?: number;
}) => {
  if (typeof window === "undefined") return null;

  let width =
    ((direction === "left" || direction === "right" ? 0.667 : 1) *
      window.innerWidth) |
    0;
  while (width % scale !== 0) width++;

  const ref = useRef();

  useEffect(() => {
    // @ts-ignore
    const canvas = new GlslCanvas(ref.current);
    canvas.load(fragShader(direction));
    canvas.setUniform("u_height", height);
    canvas.setUniform("u_width", width);
    canvas.setUniform("u_scale", scale);
  }, []);

  return (
    <Grid nested={direction === "up" || direction === "down"}>
      {direction === "left" && <Column width={4} />}
      <Column
        width={direction === "up" || direction === "down" ? 12 : 8}
        style={{ height: scale * height }}
      >
        <Container
          ref={ref}
          style={direction === "right" ? { right: 0 } : {}}
          height={scale * height}
          width={width}
        />
      </Column>
      {direction === "right" && <Column width={4} />}
    </Grid>
  );
};

export default GLCA;
