import { Image } from 'antd';
import React from 'react';
import './styles.css';

export const ImageUI = ({children, ...props}) => {
  return <Image className={"image-pointer"} {...props}>{children}</Image>;
};