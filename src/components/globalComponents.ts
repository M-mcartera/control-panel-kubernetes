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
