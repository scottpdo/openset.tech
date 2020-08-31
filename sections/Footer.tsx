import Grid from "../components/Grid";
import Column from "../components/Column";
import styled from "styled-components";
import GLCA from "../components/GLCA";

const StyledFooter = styled.footer`
  /* margin-top: 0; */
`;

const Copyright = styled.div`
  text-align: center;
  padding-bottom: 40px;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Grid>
        <Column width={12}>
          <Copyright>&copy; {new Date().getFullYear()} Open Set</Copyright>
        </Column>
      </Grid>
      <GLCA height={60} direction="up" />
    </StyledFooter>
  );
};

export default Footer;
