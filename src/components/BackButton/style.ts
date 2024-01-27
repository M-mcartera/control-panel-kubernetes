import styled from 'styled-components'

export const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  background: #444;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  border: none;
  letter-spacing: 0.1rem;
  font-size: 1rem;
  padding: 7px 12px;
  transition: 0.2s;

  &:hover {
    letter-spacing: 0.2rem;
    padding: 9px 14px;
    background: #0ff0fc;
    color: #0ff0fc;
    animation: box 3s infinite;
    i {
      &::before {
        width: 15px;
        left: 20%;
        animation: move 3s infinite;
      }
      &::after {
        width: 15px;
        left: 80%;
        animation: move 3s infinite;
      }
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 2px;
    background: #272822;
  }

  span {
    position: relative;
    z-index: 1;
  }

  i {
    position: absolute;
    inset: 0;
    display: block;
    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 2px;
      left: 20%;
      bottom: -2px;
      border: 2px solid #0ff0fc;
      background: #272822;
      transition: 0.2s;
    }
    &::before {
      content: '';
      position: absolute;
      width: 10px;
      height: 2px;
      left: 80%;
      top: -2px;
      border: 2px solid #0ff0fc;
      background: #272822;
      transition: 0.2s;
    }
  }

  @keyframes move {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes box {
    0% {
      box-shadow: #27272c;
    }
    50% {
      box-shadow: 0 0 25px #0ff0fc;
    }
    100% {
      box-shadow: #27272c;
    }
  }
`
