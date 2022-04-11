
import React from 'react';
import { Row } from "antd";

export const Rows = ({style, className, children, ...props}) => {
  return <Row style={style} className= {className} {...props}>{children}</Row>;
};