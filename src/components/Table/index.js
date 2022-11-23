import React from 'react';
import { Table } from 'antd';
import styled from 'styled-components';

const TableWrapper = styled.div`
  margin-top: 20px;
  padding: 15px 0;
`;

const AntdTable = ({ columnsConfig, data, onRowClick }) => {
  return (
    <TableWrapper>
      <Table
        dataSource={data}
        columns={columnsConfig}
        onRow={(record, rowIndex) => {
          return {
            onClick: e => {
              onRowClick(e, record, rowIndex);
            }
          };
        }}
      />
    </TableWrapper>
  );
};

export default AntdTable;
