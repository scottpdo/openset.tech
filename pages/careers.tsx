/// <reference path="../types/global.d.ts" />

import Wrapper from "../components/Wrapper";
import Contact from "../sections/Contact";
import Header from "../components/Header";
import TopNav from "../components/TopNav";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import Grid from "../components/Grid";
import Column from "../components/Column";
import PageTitle from "../components/PageTitle";
import Footer from "../sections/Footer";

const Careers = () => {
  return (
    <Wrapper>
      <div>
        <TopNav />
        <PageTitle>Careers</PageTitle>
        <Section dir="right">
          <Grid>
            <Column width={4} medWidth={12}>
              <SectionTitle>Contract Front-end Developer</SectionTitle>
            </Column>
            <Column width={8} medWidth={12}>
              <p style={{ marginTop: 0 }}>
                Open Set is looking for a skilled front-end developer to help us
                build web projects ranging from interactive data visualizations
                to responsive websites to complex user interfaces. While the
                main responsibilities of this position will be implementing the
                front-end, the ideal candidate will have experience working up
                and down the stack, and won’t be shy about providing feedback on
                designs as well as back-end infrastructure. This contract is for
                6 weeks and pays $10,000. A full-time position is a possibility
                at the end of the contract but is not guaranteed.
              </p>
              <p>
                <b>Responsibilities</b>
              </p>
              <ul>
                <li>
                  Build responsive websites and interfaces based on design specs
                </li>
                <li>
                  Collaborate with design team and tech lead to find the
                  front-end solutions that best achieve project goals
                </li>
                <li>QA and test front-end work across browsers and devices</li>
              </ul>
              <p>
                <b>Requirements</b>
              </p>
              <ul>
                <li>3+ years of front-end development experience</li>
                <li>
                  Highly skilled at HTML (and templating languages), CSS (and
                  preprocessors)
                </li>
                <li>
                  Proficient in vanilla JavaScript, highly skilled in at least
                  one JS framework (preferably React)
                </li>
                <li>Data visualization experience (preferably using d3.js)</li>
                <li>
                  Experience with at least one back-end language (Node.js,
                  Python, or PHP preferred) and server-side web framework
                </li>
                <li>
                  Familiarity with accessibility issues on the web and
                  implementing interfaces for users with differing abilities
                </li>
                <li>
                  Knowledge of web performance issues and how to address them
                </li>
                <li>
                  Ability to communicate visual ideas in technical terms and
                  vice-versa
                </li>
                <li>
                  Ability to extrapolate from incomplete information (e.g.
                  create a mobile layout from desktop mock-ups)
                </li>
              </ul>
              <p>
                To apply, send an email with the subject line "Contract
                Front-end Developer at Open Set" to{" "}
                <a href="mailto:hello@openset.tech?subject=Contract+Front-end+Developer+at+Open+Set">
                  hello@openset.tech
                </a>
                . Include your resume, links to a portfolio site and/or to
                previous work, and tell us why you're a great candidate for this
                role.
              </p>
            </Column>
          </Grid>
        </Section>
        <Contact />
      </div>
      <Footer />
    </Wrapper>
  );
};

export default Careers;
