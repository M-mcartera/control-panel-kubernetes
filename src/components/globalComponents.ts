import { EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
export const EntryPage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fbfbfb;
`;

export const PageHeader = styled(Link)`
  font-size: 2rem;
  font-weight: 600;
  margin: 40px 0;
  color: inherit;
`;

export const ErrorMessage = styled.span`
  display: block !important;
  font-weight: 500 !important;
  color: red !important;
  font-size: 0.875rem !important;
  margin-top: 0 !important;
`;

export const ActionsList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  row-gap: 5px;
  max-width: 180px;
  span {
    border-radius: 15px;
    padding: 5px;
    background-color: #2f8bfd;
    transition: all 0.2s ease;
    text-align: center;
    color: #fff;
    cursor: pointer;
    &:hover {
      background-color: #0072ff;
    }
  }
`;

export const ActionsElipsis = styled(EllipsisOutlined)`
  font-size: 20px;
  letter-spacing: 5px;
  color: #888888;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

export const FooterButtons = styled.div`
  width: 80%;
  margin: 15px auto;
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;
  align-items: center;
  span {
    width: auto;
    border-radius: 15px;
    padding: 10px 35px;
    background-color: #2f8bfd;
    transition: all 0.2s ease;
    text-align: center;
    color: #fff;
    cursor: pointer;
    &:hover {
      background-color: #0072ff;
    }
  }
`;
