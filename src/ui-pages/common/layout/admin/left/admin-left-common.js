import { Button, Col, Layout, Menu, Row, Input, Tooltip } from "antd";


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
            style={{ width: '100%', height: '100vh' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode={mode}
            theme={theme}

        >
            <Menu.Item style={{ height: '80px' }}>

                <Link to="/admin/home" className="menu_left">
                    <img src="/admin_logo.svg"></img>
                </Link>
            </Menu.Item>
           
            <Menu.Item style={{ height: '50px' }}>
                <Tooltip placement="right" title={"Người dùng"}>
                    <Link to="/admin/users" className="menu_left">
                        <UserOutlined style={{ fontSize: '25px' }} />
                    </Link>
                </Tooltip>
            </Menu.Item>
            <Menu.Item style={{ height: '50px' }}>
                <Tooltip placement="right" title={"Nhóm người dùng"}>
                    <Link to="/admin/roles" className="menu_left">
                        <UsergroupAddOutlined style={{ fontSize: '25px' }} />
                    </Link>
                </Tooltip>
            </Menu.Item>
            <Menu.Item style={{ height: '50px' }}>
                <Tooltip placement="right" title={"Nhập dữ liệu"}>
                    <Link to="/admin/documents" className="menu_left">
                        <FolderOpenOutlined style={{ fontSize: '25px' }} />
                    </Link>
                </Tooltip>
            </Menu.Item>
            <Menu.Item style={{ height: '50px' }}>
                <Tooltip placement="right" title={"Workflows"}>
                    <Link to="/admin/workflows" className="menu_left">
                        <BranchesOutlined style={{ fontSize: '25px'}} />
                    </Link>
                </Tooltip>
            </Menu.Item>
            
        </Menu>
    )
}