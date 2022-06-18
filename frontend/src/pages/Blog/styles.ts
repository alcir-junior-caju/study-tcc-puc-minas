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

export const ContainerLoading = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ContainerPost = styled.div`
  margin: 64px auto;
  max-width: 1100px;
  padding: 0 10px;

  & > img {
    margin-bottom: 10px;
    width: 100%;
  }

  & > h2 {
    margin: 0;
  }

  & > small {
    margin-bottom: 8px;
  }

  & > p {
    margin-top: 16px;
  }

  & > div {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 16px;
    width: 100%;

    & > svg {
      cursor: pointer;
      margin-bottom: 4px;
    }
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

export const ContainerList = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  & > div {
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    & > svg {
      margin-right: 8px;
    }
  }
`;

export const Photo = styled.div`
  align-self: center;
  margin-bottom: 32px;
  position: relative;

  label {
    align-items: center;
    background: #ff9000;
    border: 0;
    border-radius: 8px;
    bottom: 0;
    cursor: pointer;
    display: flex;
    height: 48px;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 2px;
    transition: background-color 0.2s;
    width: 100%;

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

export const List = styled(Link)`
  align-items: center;
  background: #3e3b47;
  border-radius: 10px;
  color: #f4ede8;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 8px;
  padding: 16px 24px;
  text-decoration: none;
  transition: background-color 0.2s;
  width: 100%;

  &:hover {
    background: ${shade(0.4, '#3e3b47')};
  }

  & > img {
    margin-bottom: 20px;
  }

  & > small {
    margin-bottom: 8px;
  }
`;

export const Select = styled.select`
  align-items: center;
  background: #232129;
  border: 2px solid #232129;
  border-radius: 10px;
  color: #666360;
  display: flex;
  margin: 6px 0;
  padding: 16px;
  width: 100%;
`;
