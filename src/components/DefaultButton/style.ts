import styled from "styled-components";

export const Wrap = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3ad2d0;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:hover::before {
    left: 0;
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.95);
    box-shadow: none;
  }
`;
