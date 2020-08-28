import { useEffect, useRef } from "react";
import GlslCanvas from "../lib/GlslCanvas";
import Grid from "../components/Grid";
import Column from "../components/Column";
import styled from "styled-components";
import Section from "../components/Section";
import Lede from "../components/Lede";
import SectionTitle from "../components/SectionTitle";
import ColumnFiller from "../components/ColumnFiller";
import photoShader from "../utils/photoShader";

const TableTitle = styled.h4`
  margin: 0.5rem 0 0 0;
`;

const List = styled.ul`
  margin: 0.5rem 0 0 0;
  list-style-type: none;
  padding-left: 0;

  li {
    align-items: center;
    display: flex;
    font-size: 16px;
    line-height: 1.2;
    margin-bottom: 0.4em;

    &:before {
      content: "◑";
      margin-right: 8px;
      color: #00f;
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

const About = () => {
  const ref = useRef();

  useEffect(() => {
    // @ts-ignore
    // const canvas = new GlslCanvas(ref.current);
    // canvas.load(photoShader);
    // canvas.setUniform("u_texture", "/static/network.png");
  }, []);

  return (
    <Section>
      <P1>
        <Grid>
          <Column width={2} largeWidth={1} medWidth={12} />
          <Column width={7} smallWidth={12}>
            <SectionTitle>About</SectionTitle>
            <Lede sub>
              Our overarching goal is to make complexity approachable and
              understandable.
            </Lede>
          </Column>
          <Column width={3} largeWidth={3} medWidth={4} smallWidth={12}>
            <ColumnFiller>
              <noscript>
                <img
                  src="/static/network.png"
                  alt=""
                  style={{ width: "100%" }}
                />
              </noscript>
              <canvas
                ref={ref}
                width={400}
                height={400}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </ColumnFiller>
          </Column>
        </Grid>
      </P1>
      <Grid>
        <Column width={4} largeWidth={3} medWidth={2} smallWidth={12} />
        <Column width={6} medWidth={10} smallWidth={12}>
          <p>
            With the web as a medium, our digital products range from
            user-facing websites and apps to data visualizations to tools for
            developers and researchers.
          </p>
          <p>
            By thoughtfully designing and building software, we help people
            struggling with complex systems to make sense of them.
          </p>
        </Column>
      </Grid>
      <Grid>
        <Column width={4} medWidth={2} smallWidth={12} />
        <Column width={6} largeWidth={8} medWidth={10} smallWidth={10}>
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
        <Column width={2} />
      </Grid>
    </Section>
  );
};

export default About;
