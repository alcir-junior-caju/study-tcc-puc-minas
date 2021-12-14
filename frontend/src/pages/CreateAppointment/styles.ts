import { Link } from 'react-router-dom';

import { shade } from 'polished';
import styled, { css } from 'styled-components';

import Button from '@components/Button';

interface ListProps {
  selectedprovider: number;
}

interface AvailableProps {
  available: number;
  selected: number;
}

export const Container = styled.div``;

export const Carroussel = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1100px;
  padding: 0 20px;

  @media only screen and (max-width: 600px) {
    padding: 0 10px;
  }

  > svg {
    background: #3e3b47;
    border-radius: 50%;
    cursor: pointer;
    height: 28px;
    padding: 5px;
    width: 28px;

    &:hover {
      background: ${shade(0.4, '#3e3b47')};
    }
  }
`;

export const ProviderList = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 32px auto;
  max-width: 944px;
  overflow: hidden;
  scroll-behavior: smooth;

  @media only screen and (max-width: 600px) {
    width: 265px;
  }
`;

export const List = styled(Link)<ListProps>`
  align-items: center;
  background: ${({ selectedprovider }) =>
    selectedprovider ? '#ff9000' : '#3e3b47'};
  border-radius: 10px;
  color: ${({ selectedprovider }) =>
    selectedprovider ? '#232129' : '#f4ede8'};
  display: flex;
  padding: 8px 12px;
  text-decoration: none;
  transition: background-color 0.2s;

  & + a {
    margin-left: 20px;
  }

  &:hover {
    background: ${({ selectedprovider }) =>
      selectedprovider ? shade(0.2, '#f99000') : shade(0.4, '#3e3b47')};
  }

  img {
    border-radius: 50%;
    height: 28px;
    width: 28px;
  }

  > svg {
    background: #4d4958;
    color: #f4ede8;
    border-radius: 50%;
    height: 28px;
    padding: 6px;
    width: 28px;
  }

  strong {
    flex: 1;
    font-size: 12px;
    margin-left: 10px;
    white-space: nowrap;
  }
`;

export const Content = styled.main`
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: 3fr 1fr;
  margin: 64px auto;
  max-width: 1100px;
  padding: 0 20px;

  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    margin: 0 auto;
  }
`;

export const Schedule = styled.div`
  flex: 1;
  order: 1;

  @media only screen and (max-width: 600px) {
    order: 2;
  }

  p {
    align-items: center;
    color: #ff9000;
    display: flex;
    font-weight: 500;
    margin-bottom: 20px;
    margin-top: 8px;

    span {
      align-items: center;
      display: flex;
    }

    span + span::before {
      background: #ff9000;
      content: '';
      height: 12px;
      margin: 0 8px;
      width: 1px;
    }
  }
`;

export const Calendar = styled.aside`
  order: 2;

  @media only screen and (max-width: 600px) {
    order: 1;
    margin-top: 25px;
  }
`;

export const Section = styled.section`
  & + section {
    margin-top: 48px;
  }

  > strong {
    border-bottom: 1px solid #3e3b47;
    color: #999591;
    display: block;
    font-size: 20px;
    line-height: 26px;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }
`;

export const ContainerHours = styled.div`
  align-items: space-between;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 600px) {
    display: inherit;
  }
`;

export const HourAvailable = styled.div<AvailableProps>`
  background: #3e3b47;
  border-radius: 5px;
  color: #f4ede8;
  opacity: ${({ available }) => (available ? 1 : 0.3)};
  padding: 10px;
  text-align: center;

  @media only screen and (max-width: 600px) {
    margin-bottom: 6px;
  }

  & + div {
    margin-left: 16px;

    @media only screen and (max-width: 600px) {
      margin-left: 0;
    }
  }

  ${({ available }) =>
    available &&
    css`
      cursor: pointer;

      &:hover {
        background: #ff9000;
        color: #232129;
      }
    `}

  ${({ available, selected }) =>
    available &&
    selected &&
    css`
      background: #ff9000;
      color: #232129;
    `}
`;

export const ScheduleButton = styled(Button)`
  margin-top: 55px;
`;
