import React from 'react';
import { CardWrapper } from './Card.styled';

const Card = ({ children }) => {
  return <CardWrapper>{children}</CardWrapper>;
};

export default Card;
