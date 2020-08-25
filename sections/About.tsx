import Grid from "../components/Grid";
import Column from "../components/Column";
import styled from "styled-components";
import Section from "../components/Section";
import Lede from "../components/Lede";

const List = styled.ul`
  columns: 2;
`;

const P1 = styled.div`
  /* margin-bottom: 80px; */
`;

const About = () => (
  <>
    <Section>
      <P1>
        <Grid>
          <Column width={2} />
          <Column width={8}>
            <h3>About</h3>
            <Lede sub>
              Our overarching goal is to make complexity approachable and
              understandable.
            </Lede>
          </Column>
          <Column width={2}>
            <img src="/static/logo.png" alt="" style={{ width: "100%" }} />
          </Column>
        </Grid>
      </P1>
      <Grid>
        <Column width={4} />
        <Column width={6}>
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
        <Column width={2} />
      </Grid>
    </Section>
    <Section>
      <Grid>
        <Column width={4} />
        <Column width={6}>
          <h4>Specialties</h4>
          <List>
            <li>Full-Stack Web Development</li>
            <li>Interactive Data Visualization</li>
            <li>Agent-Based Modeling and Simulation</li>
            <li>SMS (Text Message) Driven Products</li>
            <li>Natural Language Processing</li>
          </List>
          <h4>Platforms</h4>
          <List>
            <li>Web and Responsive/Mobile Web</li>
            <li>Single-Page Apps</li>
            <li>Serverless</li>
            <li>Desktop: OSX, Windows, Linux</li>
            <li>SMS</li>
          </List>
          <h4>Specialties</h4>
          <List>
            <li>Next.js</li>
            <li>Gatsby</li>
            <li>Three.js</li>
            <li>React</li>
            <li>Django</li>
            <li>WordPress</li>
          </List>
        </Column>
        <Column width={2} />
      </Grid>
    </Section>
  </>
);

export default About;
