import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

const CardLayout = styled.div`
  background-color: #f0f0f0;
  box-sizing: border-box;
  width: 95%;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  padding: ${({ padding }) => padding || '5px 10px'};
  margin: ${({ margin }) => margin || '25px auto'};
  border-radius: ${({ isHeader }) => (isHeader ? '0 0 15px 15px' : '15px')};
`;
const CardContainer = ({
  children,
  content,
  margin,
  padding,
  isHeader = false
}) => {
  return (
    <CardLayout margin={margin} padding={padding} isHeader={isHeader}>
      {isEmpty(content) ? <>{children}</> : <>{content}</>}
    </CardLayout>
  );
};

export default CardContainer;
