import { Environment, Terrain, CanvasRenderer, Colors, utils } from "flocc";
import { useRef, useEffect, useState } from "react";
import Grid from "./Grid";
import Column from "./Column";

const onScroll = (environment: Environment) => {
  return (e?: WheelEvent) => {
    if (!e) return environment.tick();
    environment.tick();
  };
};

const onMount = (
  container: React.RefObject<HTMLDivElement>,
  direction: "left" | "right" | "up" | "down",
  intervalID: number,
  setIntervalID: React.Dispatch<React.SetStateAction<number>>,
  cursor: { x: number; y: number }
) => {
  const [width, height] = [
    container.current.getBoundingClientRect().width | 0,
    18,
  ];
  const scale = 6;

  let environment = new Environment({ width, height });
  const boundOnScroll = onScroll(environment);

  let renderer = new CanvasRenderer(environment, { width, height });
  renderer.mount(container.current);
  let terrain = new Terrain(width, height, { scale });
  environment.use(terrain);

  terrain.addRule((x, y) => {
    if (
      environment.time === 0 ||
      (direction === "left" && x === width - 1) ||
      (direction === "right" && x === 0) ||
      (direction === "up" && y === height - 1) ||
      (direction === "down" && y === 0)
    ) {
      return utils.uniform() > 0.5 ? Colors.BLUE : Colors.WHITE;
    } else {
      // scoot in the given direction
      const dx = direction === "left" ? 1 : direction === "right" ? -1 : 0;
      const dy = direction === "up" ? 1 : direction === "down" ? -1 : 0;
      const right = terrain.sample(x + dx, y + dy);
      return utils.uniform() < 0.9
        ? right
        : utils.uniform() > 0.5
        ? Colors.BLUE
        : Colors.WHITE;
    }
  });

  setIntervalID(
    setInterval(() => {
      environment && environment.tick();
    }, 1000)
  );

  boundOnScroll();
  window.addEventListener("scroll", boundOnScroll);

  return () => {
    environment = null;
    renderer = null;
    terrain = null;
    window.removeEventListener("scroll", boundOnScroll);
    clearInterval(intervalID);
  };
};

const CA = ({ direction }: { direction: "left" | "right" | "up" | "down" }) => {
  const [intervalID, setIntervalID] = useState(-1);
  const container = useRef();
  useEffect(() => onMount(container, direction, intervalID, setIntervalID), []);
  return (
    <Grid>
      <Column width={12}>
        <div ref={container} />
      </Column>
    </Grid>
  );
};

export default CA;
