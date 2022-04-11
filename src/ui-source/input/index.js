import React from 'react';
import { Input, InputNumber } from "antd";

const { TextArea } = Input;

export const InputText = ({ placeholder, prefix, className, onChange ,...props}) => {
    return  <Input 
                placeholder={placeholder} 
                className={className}
                onChange={onChange}
                prefix={prefix} 
                {...props}
            />
};

export const TextAreaUI = ({ placeholder, prefix, className, onChange ,...props}) => {
    return  <TextArea 
                {...props}
                placeholder={placeholder}
                className={className}
                onChange={onChange}
            />
};

export const InputNumberUI = ({className, onChange ,...props}) => {
    return  <InputNumber 
                {...props}
                type="number"
                className={className}
                onChange={onChange}
            />
};