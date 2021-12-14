import styled from 'styled-components';

export const Container = styled.header`
  background: #28262e;
  padding: 32px 0;
`;

export const HeaderContent = styled.div`
  align-items: center;
  display: flex;
  margin: 0 auto;
  max-width: 1100px;
  padding: 0 10px;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }

  a {
    > img {
      height: 80px;
    }
  }

  button {
    background: transparent;
    border: 0;
    margin-left: auto;

    svg {
      color: #999591;
    }
  }
`;

export const Profile = styled.div`
  align-items: center;
  display: flex;
  margin-left: 80px;

  @media only screen and (max-width: 600px) {
    margin: 0;
    width: 100%;

    button {
      flex: 1;
      text-align: right;
    }
  }

  img {
    border-radius: 50%;
    height: 56px;
    width: 56px;
  }

  div {
    display: flex;
    flex-direction: column;
    line-height: 24px;
    margin-left: 16px;

    span {
      color: #f4ede8;
    }

    a {
      color: #ff9000;
      text-decoration: none;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  button {
    margin-left: 18px;
  }
`;

export const Menu = styled.ul`
  display: flex;
  flex: 1;
  list-style-type: none;
  margin-left: 36px;

  @media only screen and (max-width: 600px) {
    margin: 25px 0;
  }

  li {
    padding: 0 10px;

    span {
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    a,
    span {
      color: #ff9000;
      text-decoration: none;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
