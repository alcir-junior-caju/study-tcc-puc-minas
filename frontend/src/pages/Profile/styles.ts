import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  header {
    align-items: center;
    background: #28262e;
    display: flex;
    height: 144px;

    div {
      margin: 0 auto;
      max-width: 1100px;
      padding: 0 20px;
      width: 100%;

      svg {
        color: #999591;
      }
    }
  }
`;

export const AnimationContainer = styled.div`
  align-items: center;
  animation: ${appearFromRight} 1s;
  display: flex;
  flex-direction: column;
  place-content: center;

  form {
    display: flex;
    flex-direction: column;
    margin: 80px 0;
    text-align: center;
    width: 340px;

    h1 {
      font-size: 20px;
      margin-bottom: 24px;
      text-align: left;
    }
  }

  > a {
    align-items: center;
    color: #f4ede8;
    display: flex;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
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
  margin: -188px auto 0;
  max-width: 700px;
  place-content: center;
  width: 100%;
`;

export const Avatar = styled.div`
  align-self: center;
  margin-bottom: 32px;
  position: relative;

  img {
    border-radius: 50%;
    height: 186px;
    width: 186px;
  }

  label {
    align-items: center;
    background: #ff9000;
    border: 0;
    border-radius: 50%;
    bottom: 0;
    cursor: pointer;
    display: flex;
    height: 48px;
    justify-content: center;
    position: absolute;
    right: 0;
    transition: background-color 0.2s;
    width: 48px;

    input {
      display: none;
    }

    svg {
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
