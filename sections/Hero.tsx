import styled from "styled-components";
import { M as BREAKPOINT_M } from "../styles/breakpoints";
import Grid from "../components/Grid";
import Column from "../components/Column";
import Lede from "../components/Lede";

const Branding = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.header`
  margin-top: 60px;

  h1,
  h2 {
    margin: 0;
    font-weight: 400;
  }

  h1 {
    font-size: 36px;
    margin-bottom: -4px;
  }

  h2 {
    font-size: 18px;
  }
`;

const HeaderLogo = styled.img`
  margin-right: 20px;
  width: 52px;
`;

const HeroLede = styled(Lede)`
  margin: 180px auto;
  text-align: center;
`;

const Hero = () => (
  <Header>
    <Grid>
      <Column width={12}>
        <Branding>
          <HeaderLogo src="/static/logo.png" alt="" />
          <div>
            <h1>Open Set</h1>
            <h2>Software Design + Research</h2>
          </div>
        </Branding>
      </Column>
    </Grid>
    <Grid>
      <Column width={12}>
        <HeroLede>
          Open Set designs and builds software to explore, visualize, and
          analyze <b>complex systems</b>.
        </HeroLede>
      </Column>
    </Grid>
  </Header>
);

export default Hero;
