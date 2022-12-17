import React from 'react';
import { BsExclamationCircleFill } from 'react-icons/bs';
import styled from 'styled-components';

const ErrorWrapper = styled.div`
  margin: 10px 0 0 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  column-gap: 10px;
  color: red;
  font-family: Poppins, sans-serif;
  letter-spacing: 0.3px;
`;
const Error = ({ error }) => {
  if (!error) {
    return <></>;
  }
  return (
    <ErrorWrapper>
      <span>
        <BsExclamationCircleFill />
      </span>
      <span>{error}</span>
    </ErrorWrapper>
  );
};

export default Error;
