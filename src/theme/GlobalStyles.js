import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html,
  body {
    --primaryColor: #6961d5;
    --toggle: #333333;
    --grey: #696974;
    --greySecond: #92929d;
    --white: #fff;
    --font: 'Apercu';
    --title: #44444f;


    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${props => props.theme.default.tableHeadBg};
    color: rgba(0, 0, 0, 0.65);
    line-height: 1.5;
  }


  *, button {
    font-family: ${props => props.theme.default.font};
  }
   thead tr th {
    white-space: nowrap;
  }

  tr[class^='makeStyles-tableRow'] td {
    background-color: transparent !important;
  }

  table {
    width: 100%;
    table-layout: fixed;
  }

  ul.ant-pagination {
    display: flex;
    justify-content: flex-end;
    width: 90%;
    column-gap: 10px;
    list-style: none;
  }
  
  
  .ant-table-tbody > tr > td,
  .ant-table-thead > tr > th {
    font-family: ${({ theme }) => theme.default.font}, sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: ${props => props.theme.default.title};
    text-transform: lowercase;
    background: #fafafb !important;
    border: 0 !important;
    padding: 10px;
  }

  .ant-table-thead > tr > th{
    font-weight: 600 !important;;
    text-transform: uppercase;
    font-size: 10px;
  }
  .ant-table-tbody > tr > td {
    font-family: ${({ theme }) => theme.default.font}, sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: ${({ theme }) => theme.default.grey};
    border: 0 !important;
    cursor: pointer;
  }
  
  tr.ant-table-row:hover > td {
    background: transparent !important;
  }

  .ant-table-tbody > tr > td:nth-child(1) {
    font-family: ${({ theme }) => theme.default.font}, sans-serif;
    font-weight: 500;
  }`;

export default GlobalStyles;
