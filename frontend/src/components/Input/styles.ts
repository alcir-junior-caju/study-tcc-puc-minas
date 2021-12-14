import styled, { css } from 'styled-components';

import Tooltip from '@components/Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  align-items: center;
  background: #232129;
  border: 2px solid #232129;
  border-radius: 10px;
  color: #666360;
  display: flex;
  padding: 16px;
  width: 100%;

  ${({ isErrored }) =>
    isErrored &&
    css`
      border-color: #c53030;
      color: #c53030;
    `};

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: #ff9000;
      color: #ff9000;
    `};

  ${({ isFilled }) =>
    isFilled &&
    css`
      color: #ff9000;
    `};

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 16px;
  }

  input {
    background: transparent;
    border: 0;
    color: #f4ede8;
    flex: 1;

    &::placeholder {
      color: #666360;
    }

    &:-webkit-autofill {
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: #666360 !important;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  && {
    span {
      background: #c53030;
      color: #fff;

      &::before {
        border-color: #c53030 transparent;
      }
    }
  }
`;
