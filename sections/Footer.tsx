import Grid from "../components/Grid";
import Column from "../components/Column";
import styled from "styled-components";
import GLCA from "../components/GLCA";

const StyledFooter = styled.footer`
  margin-top: 80px;
`;

const Copyright = styled.div`
  font-size: 16px;
  text-align: center;
  padding-bottom: 40px;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Grid>
        <Column width={12}>
          <Copyright>
            &copy; {new Date().getFullYear()} Open Set &mdash; Software Design +
            Research
          </Copyright>
        </Column>
      </Grid>
      <GLCA height={50} direction="up" />
    </StyledFooter>
  );
};

export default Footer;
