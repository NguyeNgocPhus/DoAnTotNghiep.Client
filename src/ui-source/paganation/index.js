
import { Pagination } from 'antd';
import React from 'react';
import './styles.css';

export const PaginationUI = ({className="", children, ...props}) => {
    const cssClass = [className, "border-none"];
    return <Pagination className={cssClass.join(" ")} {...props}>{children}</Pagination>;
};