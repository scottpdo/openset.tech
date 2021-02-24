import styled from "styled-components";
import Column from "./Column";
import Grid from "./Grid";
import CA from "./CA";

const StyledTitle = styled.h1`
  font-size: 70px;
  font-weight: 400;
  margin-top: 1.25em;
`;

const PageTitle = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <Grid>
      <Column width={12}>
        <StyledTitle {...props} />
        <CA direction="right" />
      </Column>
    </Grid>
  );
};

export default PageTitle;
