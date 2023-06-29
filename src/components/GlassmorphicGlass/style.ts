import styled from "styled-components";

export const Card = styled.div`
  cursor: pointer;
  display: block;
  position: relative;
  width: 262px;
  background-color: #f2f8f9;
  border-radius: 4px;
  padding: 32px 24px;
  margin: 12px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: #00838d;
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.25s ease-out;
  }

  h3 {
    color: #262626;
    font-size: 17px;
    line-height: 24px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  p {
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    color: #666666;

    &.small {
      font-size: 14px;
    }
  }

  &:hover:before {
    transform: scale(21);
  }

  &:hover {
    p {
      transition: all 0.3s ease-out;
      color: rgba(255, 255, 255, 0.8);
    }
    h3 {
      transition: all 0.3s ease-out;
      color: #ffffff;
    }
  }
`;

export const GoCorner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 32px;
  height: 32px;
  overflow: hidden;
  top: 0;
  right: 0;
  background-color: #00838d;
  border-radius: 0 4px 0 32px;
`;
export const GoArrow = styled.div`
  margin-top: -4px;
  margin-right: -4px;
  color: white;
  font-family: courier, sans-serif;
`;
