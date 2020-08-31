import { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
`;

const fadeInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
`;

export { fadeIn, fadeInLeft };
