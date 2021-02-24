/// <reference path="../types/global.d.ts" />

import { Environment, Terrain, CanvasRenderer, Colors, utils } from "flocc";
import { useRef, useEffect, useState } from "react";
import Grid from "./Grid";
import Column from "./Column";
import styled from "styled-components";
import inViewport from "../utils/inViewport";

const scale = 7;

const Container = styled.div`
  position: absolute;
  top: 0;
`;

const onScroll = (
  container: React.RefObject<HTMLDivElement>,
  environment: Environment,
  run: () => void
) => {
  return () => {
    if (inViewport(container)) {
      if (!environment.get("inViewport")) run();
    } else {
      environment.set("inViewport", false);
    }
  };
};

const onMount = (
  container: React.RefObject<HTMLDivElement>,
  direction: "left" | "right" | "up" | "down",
  _height: number
) => {
  const width =
    ((direction === "left" || direction === "right" ? 0.667 : 1) *
      window.innerWidth) |
    0;
  const height = _height * scale;

  let environment = new Environment({ width, height });
  environment.set("inViewport", false);

  let renderer = new CanvasRenderer(environment, { width, height });
  renderer.mount(container.current);
  let terrain = new Terrain(width, height, { scale });
  environment.use(terrain);

  terrain.addRule((x, y) => {
    if (!window.__GLOBAL_CURSOR)
      window.__GLOBAL_CURSOR = { x: -9999, y: -9999 };
    if (
      environment.time === 0 ||
      (direction === "left" && x === width - 1) ||
      (direction === "right" && x === 0) ||
      (direction === "up" && y === height - 1) ||
      (direction === "down" && y === 0)
    ) {
      return utils.uniform() > 0.25 ? Colors.BLUE : Colors.WHITE;
    } else {
      // scoot in the given direction
      const dx = direction === "left" ? 1 : direction === "right" ? -1 : 0;
      const dy = direction === "up" ? 1 : direction === "down" ? -1 : 0;
      const next = terrain.sample(x + dx, y + dy);
      // special case: fade down or up
      if (direction === "down") {
        if (utils.uniform() < y / _height) return Colors.WHITE;
      } else if (direction === "up") {
        if (utils.uniform() > y / (0.66 * _height)) return Colors.WHITE;
      }
      // special case: fade left or right
      if (direction === "left" && x <= 20) {
        return utils.uniform() > x / 20 ? Colors.WHITE : next;
      } else if (direction === "right" && x + 20 > width / scale) {
        return utils.uniform() > (width / scale - x) / 20 ? Colors.WHITE : next;
      }
      return utils.uniform() < 0.9
        ? next
        : utils.uniform() > 0.5
        ? Colors.BLUE
        : Colors.WHITE;
    }
  });

  const run = () => {
    if (inViewport(container)) {
      environment.set("inViewport", true);
    }
    environment.tick();
    if (environment.get("inViewport")) setTimeout(run, 50);
  };

  run();

  const boundOnScroll = onScroll(container, environment, run);

  window.addEventListener("scroll", boundOnScroll);

  return () => {
    environment = null;
    renderer = null;
    terrain = null;
    window.removeEventListener("scroll", boundOnScroll);
  };
};

const CA = ({
  direction,
  height = 3,
  ...props
}: {
  direction: "left" | "right" | "up" | "down";
  height?: number;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const container = useRef();

  useEffect(() => {
    return onMount(container, direction, height);
  }, []);

  return (
    <Grid nested={direction === "up" || direction === "down"} {...props}>
      {direction === "left" && <Column width={4} />}
      <Column
        width={direction === "up" || direction === "down" ? 12 : 8}
        style={{ height: scale * height }}
      >
        <Container
          ref={container}
          style={direction === "right" ? { right: 0 } : {}}
        />
      </Column>
      {direction === "right" && <Column width={4} />}
    </Grid>
  );
};

export default CA;
