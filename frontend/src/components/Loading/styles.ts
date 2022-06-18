import styled, { keyframes } from 'styled-components';

const rippleAnimation = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

export const Container = styled.div`
  display: inline-block;
  height: 80px;
  position: relative;
  width: 80px;

  & > div {
    animation: ${rippleAnimation} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    border: 4px solid #fff;
    border-radius: 50%;
    opacity: 1;
    position: absolute;

    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
`;
