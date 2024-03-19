import { Button, Col, Layout, Menu, Row, Input } from "antd";


import {
    AppstoreOutlined,
    CalendarOutlined,
    LinkOutlined,
    MailOutlined,
    SettingOutlined,
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
    const items = [
        getItem('', '1', <MailOutlined />),
        getItem('', '2', <CalendarOutlined />),
        getItem('', 'sub1', <AppstoreOutlined />),
        getItem('', 'sub2', <SettingOutlined />),
        getItem(
            '',
            'link',
            <LinkOutlined />,
        ),
    ];
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
            style={{ width: '100%',height:'100vh' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode={mode}
            theme={theme}

        >
            <Menu.Item>

                <Link to="/shopify" className="menu_left">
                    <MailOutlined />
                </Link>
            </Menu.Item>
            <Menu.Item>

                <Link to="/shopify" className="menu_left">
                    <SettingOutlined />
                </Link>
            </Menu.Item>
            <Menu.Item>

                <Link to="/shopify" className="menu_left">
                    <CalendarOutlined />
                </Link>
            </Menu.Item>
        </Menu>
    )
}