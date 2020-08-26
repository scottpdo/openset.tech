import Grid from "../components/Grid";
import Column from "../components/Column";
import styled from "styled-components";
import Section from "../components/Section";
import Lede from "../components/Lede";

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;

  li {
    align-items: center;
    display: flex;
    font-size: 18px;
    line-height: 1.2;
    margin-bottom: 0.5em;

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
        <Column width={4} />
        <Column width={6} largeWidth={8}>
          <h4>Specialties</h4>
          <Grid nested>
            <Column width={6}>
              <List>
                <li>Full-Stack Web Development</li>
                <li>Interactive Data Visualization</li>
                <li>Agent-Based Modeling and Simulation</li>
              </List>
            </Column>
            <Column width={6}>
              <List>
                <li>SMS (Text Message) Driven Products</li>
                <li>Natural Language Processing</li>
              </List>
            </Column>
          </Grid>
          <h4>Platforms</h4>
          <List>
            <Grid nested>
              <Column width={6}>
                <li>Web and Responsive/Mobile Web</li>
                <li>Single-Page Apps</li>
                <li>Serverless</li>
              </Column>
              <Column width={6}>
                <li>Desktop: OSX, Windows, Linux</li>
                <li>SMS</li>
              </Column>
            </Grid>
          </List>
          <h4>Technologies</h4>
          <List>
            <Grid nested>
              <Column width={6}>
                <li>Next.js</li>
                <li>Gatsby</li>
                <li>Three.js</li>
              </Column>
              <Column width={6}>
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
  </>
);

export default About;
