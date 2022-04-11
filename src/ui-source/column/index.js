import React from 'react';
import { Col } from "antd";
import Column from 'antd/lib/table/Column';

export const Cols = ({span, className, children, ...props}) => {
    return (
        <Col span={span} className={className} {...props}>
            {children}
        </Col>
    );
};

export const Columns = ({title, dataIndex, key, render, ...props}) => {
    return (
        <Column
            title={title}
            dataIndex={dataIndex}
            key={key}
            render={render}
            {...props}
        >
        </Column>
    );
};
