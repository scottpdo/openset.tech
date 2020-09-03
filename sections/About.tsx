import { useEffect, useRef } from "react";
import Grid from "../components/Grid";
import Column from "../components/Column";
import styled from "styled-components";
import Section from "../components/Section";
import Lede from "../components/Lede";
import SectionTitle from "../components/SectionTitle";
import {
  Agent,
  Environment,
  KDTree,
  CanvasRenderer,
  Vector,
  utils,
} from "flocc";
import inViewport from "../utils/inViewport";
import { M } from "../styles/breakpoints";
import ColumnFiller from "../components/ColumnFiller";

const TableTitle = styled.h4`
  margin: 0.5rem 0 0 0;
`;

const List = styled.ul`
  margin: 0.5rem 0 0 0;
  list-style-type: none;
  padding-left: 0;

  li {
    /* align-items: center; */
    display: flex;
    line-height: 1.2;
    margin-bottom: 0.4em;

    &:before {
      content: "◑";
      margin-right: 8px;
      font-size: 0.8em;
      top: 0.2em;
      /* color: #00f; */
    }
    &:nth-child(2n) {
      &:before {
        content: "◐";
      }
    }
  }
`;

const P1 = styled.div`
  /* margin-bottom: 80px; */
`;

const Container = styled.div`
  canvas {
    position: absolute;
    top: 0;
    right: 40px;

    @media screen and (max-width: ${M}px) {
      position: relative;
    }
  }
`;

const About = () => {
  const container = useRef<HTMLDivElement>();

  useEffect(() => {
    const width = 800;
    const height = 400;
    let environment = new Environment({ width, height, torus: true });
    const renderer = new CanvasRenderer(environment, { width, height });
    renderer.mount(container.current);

    const pts: Vector[] = [];
    while (pts.length < 35) {
      pts.push(new Vector(utils.random(0, width), utils.random(0, height)));
    }

    const edgeThreshold = 0;

    const tick = (agent: Agent) => {
      const { x, y, vx, vy } = agent.getData();
      const dir = new Vector(agent.get("vx"), agent.get("vy"));

      let pt1: Vector = agent.get("p1");
      let pt2: Vector = agent.get("p2");
      let d1 = Infinity;
      let d2 = Infinity;

      let alpha = 1;

      if (y < edgeThreshold) {
        alpha = y / edgeThreshold;
      }
      if (y > height - edgeThreshold) {
        const value = (height - y) / edgeThreshold;
        if (value < alpha) alpha = value;
      }
      if (x > width - edgeThreshold) {
        const value = (width - x) / edgeThreshold;
        if (value < alpha) alpha = value;
      }

      agent.set("color", `rgba(255, 255, 255, ${alpha}`);

      pts.forEach(pt => {
        const d = utils.distance(agent, pt);
        if (d < d1) {
          if (pt1 !== null) {
            pt2 = pt1;
            d2 = d1;
          }
          pt1 = pt;
          d1 = d;
        }
      });

      if (Math.abs(d1 - d2) < 3) return;

      dir.multiplyScalar(dir.length() > 1 ? 0.97 : 1.03);

      return {
        x: x + 0.7 * dir.x,
        y: y + 0.7 * dir.y,
        vx: dir.x,
        vy: dir.y,
      };
    };

    for (let i = 0; i < 400; i++) {
      const dir = utils.random(0, 2 * Math.PI, true);
      const agent = new Agent({
        color: "#fff",
        x: utils.random(0, width),
        y: utils.random(0, height),
        vx: Math.cos(dir),
        vy: Math.sin(dir),
        size: Math.abs(utils.gaussian(2, 1)) + 0.75,
      });
      agent.addRule(tick);
      environment.addAgent(agent);
    }
    const kdtree = new KDTree(environment.getAgents(), 2);
    environment.use(kdtree);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, movementX, movementY } = e;

      const rect = container.current
        .querySelector("canvas")
        .getBoundingClientRect();

      const mouse = {
        x: clientX - rect.left,
        y: clientY - rect.top,
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

    container.current.addEventListener("mousemove", onMouseMove);

    environment.tick();
    run();

    return () => {
      container.current.removeEventListener("mousemove", onMouseMove);
      environment = null;
    };
  }, []);

  return (
    <Section blue first>
      <P1>
        <Grid>
          <Column width={10} medWidth={12}>
            <SectionTitle>About</SectionTitle>
            <Lede sub>
              Our overarching goal is to make complexity approachable and
              understandable.
            </Lede>
          </Column>
        </Grid>
      </P1>
      <Grid>
        <Column width={4} smallWidth={12}>
          <Container ref={container} />
        </Column>
        <Column width={6} largeWidth={7} medWidth={8} smallWidth={12}>
          <p>
            With the web as a medium, our digital products range from
            user-facing websites and apps to data visualizations to tools for
            developers and researchers.
          </p>
          <p>
            By thoughtfully designing and building software, we help people
            struggling with complex systems to make sense of them.
          </p>
          <TableTitle>Specialties</TableTitle>
          <List>
            <Grid nested>
              <Column width={6} xSmallWidth={12}>
                <li>Full-Stack Web Development</li>
                <li>Interactive Data Visualization</li>
                <li>Agent-Based Modeling and Simulation</li>
              </Column>
              <Column width={6} xSmallWidth={12}>
                <li>SMS (Text Message) Driven Products</li>
                <li>Natural Language Processing</li>
              </Column>
            </Grid>
          </List>
          <TableTitle>Platforms</TableTitle>
          <List>
            <Grid nested>
              <Column width={6} xSmallWidth={12}>
                <li>Web and Responsive/Mobile Web</li>
                <li>Single-Page Apps</li>
                <li>Serverless</li>
              </Column>
              <Column width={6} xSmallWidth={12}>
                <li>Desktop: OSX, Windows, Linux</li>
                <li>SMS</li>
              </Column>
            </Grid>
          </List>
          <TableTitle>Technologies</TableTitle>
          <List>
            <Grid nested>
              <Column width={6} xSmallWidth={12}>
                <li>Next.js</li>
                <li>Gatsby</li>
                <li>Three.js</li>
              </Column>
              <Column width={6} xSmallWidth={12}>
                <li>React</li>
                <li>Django</li>
                <li>WordPress</li>
              </Column>
            </Grid>
          </List>
        </Column>
      </Grid>
    </Section>
  );
};

export default About;
