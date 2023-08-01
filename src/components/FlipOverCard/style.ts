import styled from "styled-components";

export const Bar = styled.div`
  position: absolute;
  top: 100px;
  left: 20px;
  height: 5px;
  width: 150px;
`;

export const EmptyBar = styled.div`
  background-color: #2e3033;
  width: 100%;
  height: 100%;
`;

export const FilledBar = styled.div`
  position: absolute;
  top: 0px;
  z-index: 3;
  width: 0px;
  height: 100%;
  background: rgb(0, 154, 217);
  background: linear-gradient(
    90deg,
    rgba(0, 154, 217, 1) 0%,
    rgba(217, 147, 0, 1) 65%,
    rgba(255, 186, 0, 1) 100%
  );
  transition: 0.6s ease-out;
`;
export const Description = styled.div`
  color: #17141d;
  font-weight: 300;
  position: absolute;
  left: 20px;
  right: 20px;
  top: 50px;
  scale: 0
  opacity: 0;
  display: none;
  font-size: 10pt;
`;

export const Card = styled.div`
  cursor: pointer;
  display: flex;
  height: 150px;
  width: 200px;
  background-color: #17141d;
  border-radius: 10px;
  box-shadow: -1rem 0 3rem #000;
  transition: 0.4s ease-out;
  position: relative;
  left: 0px;
  &:not(:first-child) {
    margin-left: -50px;
  }
  &:hover {
    transform: translateY(-20px);
    transition: 0.4s ease-out;
    height: 250px;
    & ~ .card {
      position: relative;
      left: 50px;
      transition: 0.4s ease-out;
    }
    ${Bar} {
      transition: transform 0.5s ease;
      transform: translateY(100px);
    }
    ${FilledBar} {
      width: 120px;
      transition: 0.4s ease-out;
    }
    ${Description} {
      color: white;
      scale: 1;
      opacity: 1;
      transition: 0.7s ease-out;
      display: block;
    }
    * {
      transition: 0.6 ease;
    }
  }
`;
export const Title = styled.div`
  color: white;
  font-weight: 300;
  position: absolute;
  left: 20px;
  top: 15px;
`;
