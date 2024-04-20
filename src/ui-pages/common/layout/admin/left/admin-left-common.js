import { Button, Col, Layout, Menu, Row, Input, Tooltip, Typography, Divider } from "antd";


import {
    FolderOpenOutlined,
    UserOutlined,
    BranchesOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import { useState } from "react";
import { Link } from "react-router-dom";
const { Content, Footer } = Layout;
const { Search } = Input;


export const AdminLeftCommomLayout = ({ children }) => {
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    };
   
    const [mode, setMode] = useState('inline');
    const [theme, setTheme] = useState('light');
    const changeMode = (value) => {
        setMode(value ? 'vertical' : 'inline');
    };
    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };
    return (
        <Menu
            style={{ width: '100%', height: '100vh', backgroundColor:'#1890ff'}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode={mode}
            theme={theme}

        >
            <Menu.Item style={{ height: '80px' }}>

                <Link to="/admin" className="menu_left">
                    <div className="logo_avatar">
                    <img src="/admin_logo.svg"></img>
                    </div>
                </Link>
                <div className="divider"></div>
            </Menu.Item>
            
            
            <Menu.Item style={{ height: '50px' }}>
                <Tooltip placement="right" title={"Identity"}>
                    <Link to="/admin/identity" className="menu_left">
                        <UserOutlined style={{ fontSize: '20px' , color:'white'}} />
                    </Link>
                </Tooltip>
            </Menu.Item>
           
            <Menu.Item style={{ height: '50px' }}>
                <Tooltip placement="right" title={"Nhập dữ liệu"}>
                    <Link to="/admin/documents" className="menu_left">
                        <FolderOpenOutlined style={{ fontSize: '20px', color:'white' }} />
                    </Link>
                </Tooltip>
            </Menu.Item>
            <Menu.Item style={{ height: '50px' }}>
                <Tooltip placement="right" title={"Workflows"}>
                    <Link to="/admin/workflows" className="menu_left">
                        <BranchesOutlined style={{ fontSize: '20px', color:'white'}} />
                    </Link>
                </Tooltip>
            </Menu.Item>
            <div className="user_avatar">
                <Typography.Text style={{color:'#1890ff'}}>P</Typography.Text>
            </div>
            
        </Menu>
    )
}