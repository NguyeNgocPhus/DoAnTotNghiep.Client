import { Button, Col, Layout, Menu, Row, Input, Tooltip, Typography, Divider } from "antd";


import {
    FolderOpenOutlined,
    UserOutlined,
    BranchesOutlined,
    ProductOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const { Content, Footer } = Layout;
const { Search } = Input;
const classNames = require('classnames');

const menus = [

    {
        icon: <ProductOutlined style={{ fontSize: '20px' }} />,
        name: "Dashboard",
        route: "/admin",
        isActive: true,
    },
    {
        icon: <UserOutlined style={{ fontSize: '20px' }} />,
        name: "Identity",
        route: "/admin/identity",
        isActive: false,
    },
    {
        icon: <FolderOpenOutlined style={{ fontSize: '20px' }} />,
        name: "Documents",
        route: "/admin/documents",
        isActive: false,
    },
    {
        icon: <BranchesOutlined style={{ fontSize: '20px' }} />,
        name: "Workflows",
        route: "/admin/workflows",
        isActive: false,
    }
]
export const AdminLeftCommomLayout = ({ children }) => {
    const [listMenu, setListMenu] = useState([]);

    useEffect(()=>{
        setListMenu([...menus])
    },[])
    const navigate = useNavigate();
    const onClickMenu = (route, name) => {
        var newMenus = listMenu.map(x => {
            if (x.name === name) {
                return {
                    ...x,
                    isActive: true,
                }
            } else {
                return {
                    ...x,
                    isActive: false
                }
            }
        });
        
        setListMenu([...newMenus]);
        navigate(route);
        // onMenuItemClick(key);
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                backgroundColor: '#1890ff',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '5px 0px 10px rgba(0, 0, 0, 0.1)'/* Đổ bóng bên phải */
            }}
        >
            <div style={{ margin: '15px 0' }}>

                <Link to="/" className="menu_left">
                    <div className="logo_avatar menu_left">
                        <img src="/admin_logo.svg"></img>
                    </div>
                </Link>
                <div className="divider"></div>
            </div>
            {listMenu.length && listMenu.map(x => {
                return (
                    <div key={x.name} className="menu_item" >
                        <div className={classNames('menu_item_childen', `${x.isActive ? "menu_item_childen_click" : ""}`)} onClick={() => { onClickMenu(x.route, x.name) }}>
                            {x.icon}
                            <span>{x.name}</span>
                        </div>
                    </div>
                )

            })}



            {/* <div className="menu_item" onClick={() => { onClickMenu("/admin/identity", "1") }}>
                <div className={`menu_item_childen ${menu1}`} >

                    <span>Identity</span>
                </div>
            </div>
        
            <div className="menu_item" onClick={() => { onClickMenu("/admin/documents", "2") }}>
                <div className={`menu_item_childen ${menu2}`}>

                    <span>Documents</span>
                </div>
            </div>
            <div className="menu_item" onClick={() => { onClickMenu("/admin/workflows", "3") }} >
                <div className={`menu_item_childen ${menu3}`} >

                    <span>Workflows</span>
                </div>
            </div> */}
            <div className="user_avatar">
                <Typography.Text style={{ color: '#1890ff' }}>P</Typography.Text>
            </div>

        </div>
    )
}