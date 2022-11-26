import React from 'react';
import styled from 'styled-components';
import CardContainer from './CardContainer';
import { AiFillStepBackward } from 'react-icons/ai';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

const LayoutHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BackButtonWrapper = styled.div`
  min-width: 80px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  column-gap: 2px;
  align-items: center;
  text-align: center;
  span {
    font-family: Roboto, sans-serif;
    font-size: 16px;
  }
  cursor: pointer;
  transition: all 0.3s ease;
  :hover {
    border: 1px solid blue;
  }
`;

const Title = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1.5px;
`;

const DateDiv = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: italic;
  font-weight: 300;
`;
const GeneralLayout = ({
  children,
  backText,
  backlink,
  backHandler,
  title
}) => {
  const fetchedDate = new Date();
  const history = useHistory();
  const handleBack = () => {
    if (isEmpty(backlink)) {
      backHandler();
    } else {
      history.push(backlink);
    }
  };
  return (
    <>
      <CardContainer padding="30px">
        <LayoutHeaderWrapper>
          <BackButtonWrapper
            onClick={() => {
              handleBack();
            }}
          >
            <AiFillStepBackward />
            <span>{backText || 'Back'}</span>
          </BackButtonWrapper>
          <Title>{title}</Title>
          <DateDiv>{format(fetchedDate, 'EEEE, io, yyyy')}</DateDiv>
        </LayoutHeaderWrapper>
      </CardContainer>
      <CardContainer content={children} />
    </>
  );
};

export default GeneralLayout;
