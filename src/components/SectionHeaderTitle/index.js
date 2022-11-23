import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  :after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% - 60%);
    height: 3px;
    border-radius: 0 15px 15px 0;
    background-color: cornflowerblue;
  }
`;
const Title = styled.div`
  width: 100%;
  font-size: 20px;
  font-family: Roboto, sans-serif;
`;

const SectionHeaderTitle = ({ title }) => {
  return (
    <HeaderWrapper>
      <Title>{title}</Title>
    </HeaderWrapper>
  );
};

export default SectionHeaderTitle;
