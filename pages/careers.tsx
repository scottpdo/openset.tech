/// <reference path="../types/global.d.ts" />

import Wrapper from "../components/Wrapper";
import Contact from "../sections/Contact";
import TopNav from "../components/TopNav";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import Grid from "../components/Grid";
import Column from "../components/Column";
import PageTitle from "../components/PageTitle";
import Footer from "../sections/Footer";
import CA from "../components/CA";

const Careers = () => {
  return (
    <Wrapper title="Careers">
      <div>
        <TopNav />
        <PageTitle>Careers</PageTitle>
        <Section>
          <Grid>
            <Column width={4} medWidth={12}>
              <SectionTitle id="contract-front-end-developer">
                Contract Front-end Developer
              </SectionTitle>
            </Column>
            <Column width={8} medWidth={12}>
              <p style={{ marginTop: 0 }}>
                Open Set has an immediate need for a skilled front-end developer
                for a 6-week project (30 hours/week) to build an interactive
                data dashboard. The developer will build front-end views for
                various metrics and geographic data, including interactive
                charts and maps with the ability to filter and sort data. The
                role will be part of a 3-person team that also includes a tech
                lead and designer and is expected to collaborate closely with
                the project team closely throughout the project.
              </p>
              <p>
                <b>Responsibilities</b>
              </p>
              <ul>
                <li>
                  Build interactive dashboard interface and components based on
                  wireframes and design mockups
                </li>
                <li>QA and test front-end work across browsers and devices</li>
              </ul>
              <p>
                <b>Requirements</b>
              </p>
              <ul>
                <li>
                  3+ years of front-end development and interactive data
                  visualization experience (preferably using d3.js)
                </li>
                <li>
                  Highly skilled at HTML (and templating languages), CSS (and
                  preprocessors)
                </li>
                <li>
                  Proficient in vanilla JavaScript, highly skilled in at least
                  one JS framework (preferably React)
                </li>
                <li>
                  Experience with fetching and rendering data from REST APIs
                </li>
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
                To apply, send an email with the subject line “Contract
                Front-end Developer at Open Set” to{" "}
                <a href="mailto:hello@openset.tech?subject=Contract+Front-end+Developer+at+Open+Set">
                  hello@openset.tech
                </a>
                . Include your resume, links to a portfolio site and/or to
                previous work, and tell us why you’re a great candidate for this
                role.
              </p>
            </Column>
          </Grid>
        </Section>
        <CA direction="left" />
        <Section>
          <Grid>
            <Column width={4} medWidth={12}>
              <SectionTitle id="freelance-web-developer">
                Freelance Web Developer
              </SectionTitle>
            </Column>
            <Column width={8} medWidth={12}>
              <p style={{ marginTop: 0 }}>
                Open Set has an ongoing need for developers to work on various
                web projects, from interactive data visualizations to responsive
                websites to complex user interfaces. While the main need is for
                front-end developers, we’re also open to candidates with
                different experience (both in background and years of
                experience). Even if you don’t meet all of the requirements
                listed below, or bring other skills to the table that aren’t
                listed, consider applying!
              </p>
              <p>
                This is a flexible position, and hours can vary from week to
                week, but generally won’t exceed 20 hours per week.
              </p>
              <p>
                <b>Responsibilities</b>
              </p>
              <ul>
                <li>
                  Build responsive websites and interfaces based on design specs
                </li>
                <li>QA and test work across browsers and devices</li>
              </ul>
              <p>
                <b>Requirements</b>
              </p>
              <ul>
                <li>2+ years of experience as a web developer</li>
                <li>
                  Highly skilled at HTML (and templating languages), CSS (and
                  preprocessors)
                </li>
                <li>
                  Proficient in vanilla JavaScript and at least one JS framework
                </li>
                <li>
                  Experience with at least one back-end language and server-side
                  web framework
                </li>
              </ul>
              <p>
                To apply, send an email with the subject line “Freelance Web
                Developer at Open Set” to{" "}
                <a href="mailto:hello@openset.tech?subject=Freelance+Web+Developer+at+Open+Set">
                  hello@openset.tech
                </a>
                . Include your resume, links to a portfolio site and/or to
                previous work, and tell us why you’re a great candidate for this
                role.
              </p>
            </Column>
          </Grid>
        </Section>
        <Section blue>
          <Grid>
            <Column width={2} medWidth={12}></Column>
            <Column width={8} medWidth={12}>
              <p style={{ textAlign: "center" }}>
                Open Set is committed to equal opportunity employment and
                creating a working environment free from discrimination and
                harassment. We especially encourage people whose backgrounds are
                underrepresented in technology to apply.
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
