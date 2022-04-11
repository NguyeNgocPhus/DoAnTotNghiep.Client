import React from 'react';
import { Select } from "antd";
const {Option} = Select;

export const MySelect = ({ placeholder, defaultValue, className, children, ...props}) => {
  return <Select 
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={className}
            getPopupContainer={trigger => trigger.parentNode}
            {...props}
          >
            {children}
        </Select>;
};

export const MyOption = Option