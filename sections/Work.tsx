import {
  Environment,
  Agent,
  CanvasRenderer,
  Vector,
  utils,
  KDTree,
} from "flocc";
import Grid from "../components/Grid";
import Column from "../components/Column";
import Section from "../components/Section";
import Lede from "../components/Lede";
import { useEffect, useRef } from "react";
import inViewport from "../utils/inViewport";
import SectionTitle from "../components/SectionTitle";

const tick = (agent: Agent) => {
  const dir = new Vector(agent.get("vx"), agent.get("vy"));
  agent.set("x", agent.get("x") + dir.x);
  agent.set("y", agent.get("y") + dir.y);

  const { x, y } = agent.getData();
  const step = new Vector();
  const threshold = 40;
  const { kdtree } = agent.environment.helpers;
  const neighbors = kdtree.agentsWithinDistance(agent, threshold);
  if (neighbors.length === 0) return;

  const v = (n: number) => Math.min(1, threshold / n);
  neighbors.forEach(neighbor => {
    const away = new Vector(v(x - neighbor.get("x")), v(y - neighbor.get("y")));
    away.normalize().multiplyScalar(0.03);
    step.add(away);
  });

  dir.add(step);
  dir.multiplyScalar(dir.length() > 1 ? 0.97 : 1.03);
  agent.set("vx", dir.x);
  agent.set("vy", dir.y);
};

const Work = () => {
  const container = useRef<HTMLDivElement>();

  useEffect(() => {
    const [width, height] = [window.innerWidth, 400];
    const environment = new Environment({ width, height });
    const renderer = new CanvasRenderer(environment, { width, height });
    renderer.mount(container.current);

    for (let i = 0; i < width / 10; i++) {
      const agent = new Agent();
      const angle = 2 * Math.PI * Math.random();
      const dir = new Vector(Math.cos(angle), Math.sin(angle));
      dir.normalize();
      agent.set("vx", dir.x);
      agent.set("vy", dir.y);
      agent.set("x", Math.random() * width);
      agent.set("y", Math.random() * height);
      agent.set("color", `rgb(0, 0, ${utils.random(0, 255)})`);
      agent.set("shape", "arrow");
      agent.set("size", Math.random() * 3 + 2);
      agent.addRule(tick);
      environment.addAgent(agent);
    }
    const kdtree = new KDTree(environment.getAgents(), 2);
    environment.use(kdtree);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, movementX, movementY } = e;

      const mouse = {
        x: clientX - container.current.getBoundingClientRect().left,
        y: clientY - container.current.getBoundingClientRect().top,
      };

      kdtree.agentsWithinDistance(mouse, 100).forEach(agent => {
        const d = utils.distance(mouse, agent);
        const inverseDistance = Math.min(0.1, 1 / d);
        agent.increment("vx", movementX * inverseDistance);
        agent.increment("vy", movementY * inverseDistance);
        agent.set("x", agent.get("x") + 20 * inverseDistance * movementX);
        agent.set("y", agent.get("y") + 20 * inverseDistance * movementY);
      });
    };

    const run = () => {
      if (inViewport(container)) environment.tick();
      requestAnimationFrame(run);
    };

    run();

    container.current.addEventListener("mousemove", onMouseMove);

    return () => {
      container.current.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <Section>
      <Grid>
        <Column width={2} largeWidth={1} medWidth={12} />
        <Column width={8} medWidth={12}>
          <SectionTitle>Work</SectionTitle>
          <Lede sub>
            Our flagship product, <a href="https://flocc.network">Flocc</a>, is
            an open-source JavaScript library for agent-based modeling.
          </Lede>
        </Column>
      </Grid>
      <Grid>
        <Column width={2} largeWidth={1} medWidth={12} />
        <Column width={4} largeWidth={5} medWidth={12}>
          <p>
            We’ve also built products for the City of San José, Accion
            International, Books@Work, and other organizations.
          </p>
          <p>If you’re interested in learning more, get in touch.</p>
        </Column>
        <Column width={6}>
          <div ref={container} />
        </Column>
      </Grid>
    </Section>
  );
};

export default Work;
