import { Link } from 'react-router-dom';

import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  h1 {
    margin: 32px auto;
    max-width: 1100px;
    padding: 0 10px;
  }
`;

export const Content = styled.main`
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  margin: 64px auto;
  max-width: 1100px;
  padding: 0 10px;

  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    margin: 0 auto;
  }
`;

export const List = styled(Link)`
  align-items: center;
  background: #3e3b47;
  border-radius: 10px;
  color: #f4ede8;
  display: flex;
  padding: 16px 24px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.4, '#3e3b47')};
  }

  img {
    border-radius: 50%;
    height: 56px;
    margin-right: 20px;
    width: 56px;
  }

  > svg {
    background: #4d4958;
    border-radius: 50%;
    height: 56px;
    margin-right: 20px;
    padding: 6px;
    width: 56px;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    strong {
      flex: 1;
      font-size: 18px;
    }

    span {
      align-items: center;
      color: #999591;
      display: flex;
      font-size: 14px;

      svg {
        color: #ff9000;
        margin-right: 5px;
      }
    }
  }
`;
