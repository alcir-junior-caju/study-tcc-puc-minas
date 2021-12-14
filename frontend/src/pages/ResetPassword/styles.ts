import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

import background from '@assets/sign-in-background.png';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  align-items: stretch;
  display: flex;
  height: 100vh;
`;

export const AnimationContainer = styled.div`
  align-items: center;
  animation: ${appearFromLeft} 1s;
  display: flex;
  flex-direction: column;
  place-content: center;

  form {
    margin: 80px 0;
    text-align: center;
    width: 340px;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    align-items: center;
    color: #ff9000;
    display: flex;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 700px;
  place-content: center;
  width: 100%;
`;

export const Background = styled.div`
  background: url(${background}) no-repeat center;
  background-size: cover;
  flex: 1;
`;
