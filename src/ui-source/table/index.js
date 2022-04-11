import React from 'react';
import { Table } from 'antd';

import './styles.css';

export const TableUI = ({rowKey="id", rowSelection, onRow, dataSource, action, children, pagination, bordered, ...props}) => {
    return (
        <Table
            rowKey={rowKey}
            rowSelection={rowSelection}
            dataSource={dataSource}
            pagination={pagination}
            bordered={bordered}
            onRow={onRow}
            {...props}
        >
            {children}
        </Table>
    );
}
