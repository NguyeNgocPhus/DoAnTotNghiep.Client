import { Menu } from 'antd';
import React from 'react';

const { SubMenu } = Menu;

export const MenuUI = ({children, ...props}) => {
  return <Menu {...props}>{children}</Menu>;
};

export const SubMenuUI = ({children, ...props}) => {
    return <SubMenu {...props}>{children}</SubMenu>;
};
  

export const MenuItem = ({children, ...props}) => {
    return <Menu.Item {...props}>{children}</Menu.Item>;
};