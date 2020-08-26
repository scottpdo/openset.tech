import Grid from "../components/Grid";
import Column from "../components/Column";
import Section from "../components/Section";
import styled from "styled-components";
import SectionTitle from "../components/SectionTitle";

const Bio = styled.p`
  font-size: 20px;
  margin-top: 0;
`;

const Who = () => (
  <Section>
    <Grid>
      <Column width={2} largeWidth={1} medWidth={12} />
      <Column width={2} medWidth={12}>
        <SectionTitle>Who</SectionTitle>
      </Column>
    </Grid>
    <Grid>
      <Column width={2} largeWidth={1} medWidth={12} />
      <Column width={2} largeWidth={3} medWidth={4} xSmallWidth={12}>
        <img
          src="/static/scott.png"
          alt="Photo of Scott Donaldson and Gnocchi the Chihuahua"
        />
        <p>
          <b>Scott Donaldson</b>
          <br />
          Principal / Founder
          <br />
          <a href="mailto:scott@openset.tech">scott@openset.tech</a>
        </p>
      </Column>
      <Column width={5} largeWidth={8} xSmallWidth={12}>
        <Bio>
          Scott founded Open Set in 2020 after serving as Director of Technology
          at iStrategyLabs (ISL) in Washington, DC. While Open Set is a new
          venture, Scott has extensive experience as a web and software
          developer on open-source libraries, websites and apps, and design
          interfaces and prototypes. He holds an M.S. in Computational Design
          from Carnegie Mellon University and studied architecture at Columbia
          University. Scott views complexity and systems thinking as integral to
          his approach on every project.
        </Bio>
      </Column>
    </Grid>
  </Section>
);

export default Who;
