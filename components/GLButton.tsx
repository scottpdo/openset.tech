import React from "react";
import { useRef, useEffect } from "react";
import GlslCanvas from "../lib/GlslCanvas";
import styled from "styled-components";

const Container = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  transform: translateY(-100%) scale(0.5);
  opacity: 0;
  transition: 0.5s transform, 0.5s opacity;
`;

const Button = styled.button<{ small?: boolean }>`
  appearance: none;
  color: #fff;
  background: #00f;
  font-size: 20px;
  /* font-weight: bold; */
  padding: ${props => (props.small ? "3px 12px" : "6px 20px")};
  border: 0 none;
  border-radius: 2px;
  font-family: "Yrsa", "Times New Roman", Times, serif;
  cursor: pointer;
  overflow: hidden;

  &:active ${Container}, &:hover ${Container} {
    opacity: 0.35;
    transform: translateY(0) scale(0.5);
  }
`;

const fragShader = `
    #ifdef GL_ES
    precision highp float;
    #endif

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_height;
    uniform float u_width;
    uniform vec2 u_mouse;

    vec4 TRANSPARENT = vec4(0.0, 0.0, 0.0, 0.0);
    vec4 WHITE = vec4(1.0);
    vec4 RED = vec4(1.0, 0.0, 0.0, 1.0);

    float random(float x) {
      return fract(sin(x) * 100000.0);
    }

    float random2(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    bool match(vec4 a, vec4 b) {
      return a.r == b.r && a.g == b.g && a.b == b.b && a.a == b.a;
    }

    void main() {
      float scale = 2.0;
      float nx = floor(gl_FragCoord.x / scale);
      float nxt = floor(gl_FragCoord.x / scale) + sin(u_time);
      float ny = floor(gl_FragCoord.y / scale);
      vec2 st = vec2(nx, ny);

      float speed = 1.0;

      float r = random2(st);
      float dist = distance((u_mouse * 2.0 + vec2(0.0, -u_height)) / scale, vec2(nx, ny)) / 6.0;

      // vec4 color = fract(dist - u_time) > 0.5 ? WHITE : TRANSPARENT;
      // if (u_mouse.x == 0.0 && u_mouse.y == 0.0) color = TRANSPARENT;

      vec4 color = fract((nx + 2.0 * sin(0.3 * ny + u_time * 20.0)) / 8.0) > 0.5 ? WHITE : TRANSPARENT;

      gl_FragColor = color;
    }
  `;

const GLButton = ({
  children,
  onClick,
  small = false
}: React.HTMLAttributes<HTMLButtonElement> & {
  small?: boolean;
}) => {
  if (typeof window === "undefined") {
    return <Button small={small}>{children}</Button>;
  }

  const ref = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const rect = ref.current.parentElement.getBoundingClientRect();
    const [width, height] = [rect.width, rect.height];
    ref.current.width = 2 * width + 2;
    ref.current.height = 2 * height + 2;
    // @ts-ignore
    const canvas = new GlslCanvas(ref.current);
    canvas.load(fragShader);
    canvas.setUniform("u_height", 2 * height);
    canvas.setUniform("u_width", 2 * width);

    const onBlur = () => {
      // reset mouse
      canvas.uniform("2f", "vec2", "u_mouse", 0, 0);
    };

    ref.current.addEventListener("mouseout", onBlur);
    ref.current.addEventListener("mouseleave", onBlur);

    return () => {
      ref.current.removeEventListener("mouseout", onBlur);
      ref.current.removeEventListener("mouseleave", onBlur);
    };
  }, []);

  return (
    <Button onClick={onClick} small={small}>
      <Container ref={ref} />
      <span style={{ pointerEvents: "none" }}>{children}</span>
    </Button>
  );
};

export default GLButton;
