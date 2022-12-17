import React from 'react';
import styled from 'styled-components';
import { FormSubmitButton } from '../../theme/GlobalComponents';
import { isEmpty } from 'lodash';

const HeaderWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  width: 100%;
  font-size: 18px;
  font-family: Poppins, sans-serif;
  font-weight: 600;
`;

const ButtonsWrapper = styled.div`
  width: auto;
  display: flex;
  column-gap: 10px;
`;
const SectionHeaderTitle = ({ title, buttons }) => {
  return (
    <HeaderWrapper>
      <Title>{title}</Title>
      {!isEmpty(buttons) && (
        <ButtonsWrapper>
          {buttons.map(btn => (
            <FormSubmitButton
              key={btn.label}
              onClick={() => {
                btn.onClick();
              }}
            >
              {btn.icon || ''}
              {btn.label}
            </FormSubmitButton>
          ))}
        </ButtonsWrapper>
      )}
    </HeaderWrapper>
  );
};

export default SectionHeaderTitle;
