import { shade } from 'polished';
import styled from 'styled-components';

import ArrowLeftIcon from '@assets/ArrowLeftIcon.svg';
import ArrowRightIcon from '@assets/ArrowRightIcon.svg';

export const Container = styled.div`
  .DayPicker {
    border-radius: 10px;
    width: 100%;

    &-wrapper {
      background: #28262e;
      border-radius: 10px;
      padding-bottom: 0;
      z-index: 0;
    }

    &-NavBar {
      position: relative;

      ::before {
        background: #3e3b47;
        border-radius: 10px 10px 0 0;
        content: '';
        height: 50px;
        position: absolute;
        width: 100%;
        z-index: -1;
      }
    }

    &-NavButton {
      color: #999591 !important;
      margin-top: 0;
      top: 0;

      &--prev {
        background: url(${ArrowLeftIcon}) no-repeat center;
        height: 50px;
        left: 12px;
        margin-right: 0;
        width: 50px;
      }

      &--next {
        background: url(${ArrowRightIcon}) no-repeat center;
        height: 50px;
        right: 12px;
        width: 50px;
      }
    }

    &-Month {
      border-collapse: separate;
      border-spacing: 8px;
      margin: 0;
      padding: 0 10px 10px;

      @media only screen and (max-width: 600px) {
        padding: 0;
        border-spacing: 2px;
      }
    }

    &-Caption {
      color: #f4ede8;
      line-height: 50px;

      > div {
        text-align: center;
      }
    }

    &-Weekday {
      color: #666360;
      font-size: 16px;
    }

    &-Day {
      border-radius: 10px;
      height: 40px;
      transition: all 0.2s ease;
      width: 40px;

      &--today {
        color: #fff;
        font-weight: normal;
      }

      &--available:not(.DayPicker-Day--outside) {
        background: #3e3b47;
        border-radius: 10px;
      }

      &--disabled {
        background: transparent !important;
        color: #666360;
      }

      &--selected:not(.DayPicker-Day--disabled) {
        background: #ff9000 !important;
        color: #232129 !important;
      }
    }

    &:not(.DayPicker--interactionDisabled)
      .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
      background: ${shade(0.2, '#3e3b47')};
    }
  }
`;
