import styled from "styled-components";

const Lede = styled.p<{ sub?: boolean }>`
  font-size: ${props => (props.sub ? 56 : 72)}px;
  line-height: 1.2;
  max-width: 980px;

  b {
    color: #00f;
  }
`;

export default Lede;
