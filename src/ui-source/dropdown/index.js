import React from 'react';
import { Dropdown } from "antd";

export const DropdownList = ({ className, overlay, children, ...props}) => {
  return <Dropdown 
            trigger="click"
            className={className} 
            overlay={overlay} 
            {...props}
          >
            {children}
        </Dropdown>;
};