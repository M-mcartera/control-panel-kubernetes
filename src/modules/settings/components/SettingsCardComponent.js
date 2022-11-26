import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const CardWrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 20px;
  width: 200px;
  min-height: 50px;
  background-color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  :hover {
    background-color: #fff;
  }
  cursor: pointer;
`;
const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  padding-bottom: 2px;
  border-bottom: 1px solid #cacaca;
`;

const CardDescription = styled.div`
  width: 100%;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  color: black;
  padding-top: 2px;
`;

export const SettingsCardComponent = ({ title, path, description, icon }) => {
  const history = useHistory();
  return (
    <CardWrapper
      onClick={() => {
        history.push(path);
      }}
    >
      <CardHeader>
        <span>{icon}</span>
        <span>{title.toUpperCase()}</span>
      </CardHeader>
      <CardDescription>{description}</CardDescription>
    </CardWrapper>
  );
};
