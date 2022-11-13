import React from 'react';
import styled from 'styled-components';
import CardContainer from './CardContainer';
import { AiFillStepBackward } from 'react-icons/ai';
import { isEmpty } from 'lodash';

const LayoutHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const BackButtonWrapper = styled.div`
  min-width: 80px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  justify-content: center;
  column-gap: 2px;
  align-content: center;
  text-align: center;
  span {
    font-family: Roboto, sans-serif;
    font-size: 16px;
  }
`;

const GeneralLayout = ({ children, backText, backlink, backHandler }) => {
  const handleBack = () => {
    if (isEmpty(backlink)) {
      console.log(backHandler);
      console.log('backHandler');
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
          <div>title</div>
          <div>show date</div>
        </LayoutHeaderWrapper>
      </CardContainer>
      <CardContainer content={children} />
    </>
  );
};

export default GeneralLayout;
