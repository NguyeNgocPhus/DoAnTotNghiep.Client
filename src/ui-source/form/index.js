import { Form } from 'antd';
import React from 'react';


export const FormUI = ({ className, children, ...props}) => {
  return <Form 
        className={className}
        {...props}
    >
        {children}
    </Form>;
};
  

export const FormItem = ({children, ...props}) => {
    return <Form.Item 
        {...props}
    >
        {children}
    </Form.Item>;
};