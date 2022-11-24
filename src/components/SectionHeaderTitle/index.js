import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Title = styled.div`
  width: 100%;
  font-size: 18px;
  font-family: Poppins, sans-serif;
  font-weight: 600;
`;

const SectionHeaderTitle = ({ title }) => {
  return (
    <HeaderWrapper>
      <Title>{title}</Title>
    </HeaderWrapper>
  );
};

export default SectionHeaderTitle;
