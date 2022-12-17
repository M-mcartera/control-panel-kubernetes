import { Divider } from 'antd';
import styled from 'styled-components';

export const HeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
`;

export const HeadTitle = styled.span`
  font-family: Poppins, sans-serif;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0.2px;
`;

export const HeadButtons = styled.div`
  font-size: 20px;
  cursor: pointer;
`;

export const AntdDivider = styled(Divider)`
  height: 2px;
  width: 100%;
  background-color: #ccc;
  border-radius: 15px;
`;

export const InputLabel = styled.span`
  font-size: 15px;
  font-family: Poppins, sans-serif;
  font-weight: 400;
`;
