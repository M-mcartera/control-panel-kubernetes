import styled from 'styled-components';
import { Button } from 'antd';

export const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const FormWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  height: auto;
  flex-direction: column;
  row-gap: 20px;

  .ant-input {
    min-width: 230px;
    padding: 5px 10px;
    font-size: 12px;
    font-family: Poppins, sans-serif;
    letter-spacing: 0.12px;
    @media (max-width: 960px) {
      width: 100%;
    }
  }

    .ant-select {
      width: 230px;
    }

    ${Row} {
      @media (max-width: 960px) {
        justify-content: flex-start;
      }
    }
  }
`;

export const FormCancelButton = styled(Button)`
  font-family: Poppins, sans-serif;
  font-size: 18px;
  font-weight: 300;
  height: auto;
  padding: 5px 20px;
  box-sizing: border-box;
  border-radius: 15px;
  background-color: #d5d7e3;
  letter-spacing: 0.12px;
`;

export const FormSubmitButton = styled(Button)`
  font-family: Poppins, sans-serif;
  font-size: 18px;
  font-weight: 300;
  height: auto;
  padding: 5px 20px;
  box-sizing: border-box;
  border-radius: 15px;
  background-color: #57b8ff;
  letter-spacing: 0.12px;
  color: #fff;
`;

export const FormButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  column-gap: 15px;
`;
