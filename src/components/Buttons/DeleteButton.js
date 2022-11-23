import React from 'react';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';

const DeleteIconWrapper = styled.div`
  font-size: 18px;
  color: #cecece;
  transition: all 0.3s ease;
  :hover {
    color: red;
  }
`;
const DeleteButton = ({ onDelete }) => {
  return (
    <>
      <DeleteIconWrapper
        onClick={e => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <FaTrashAlt />
      </DeleteIconWrapper>
    </>
  );
};

export default DeleteButton;
