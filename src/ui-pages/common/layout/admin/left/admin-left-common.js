import { Button, Col, Layout, Menu, Row, Input, Tooltip, Typography, Divider } from "antd";


import {
    UsergroupAddOutlined,
    UserOutlined,
    BranchesOutlined,
    ProductOutlined,
    SolutionOutlined,
    DownloadOutlined,
    KeyOutlined,
    LoginOutlined
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUser, removeToken, getUser } from "../../../../../app-helper";
import { hasRole } from "../../../../../app-helper/jwtHepler";
import { useGetRoles } from "../../../../../store/auth/use-get-roles";
const classNames = require('classnames');

export const AdminLeftCommomLayout = ({ children }) => {
    
    var currentUser =  getUser();
    var showDashboard = hasRole("SuperAdmin");
    var showUser = hasRole("User") || hasRole("SuperAdmin");
    var showRole = hasRole("Role") || hasRole("SuperAdmin");
    var showDocument = hasRole("Document")  || hasRole("SuperAdmin");
    var showWorkflow = hasRole("Workflow") || hasRole("SuperAdmin");
    var showApprove =  hasRole("Approval") || hasRole("SuperAdmin");

    let listMenu = [

    ]
    if(showDashboard){
        listMenu.push(
            {
                icon: <ProductOutlined style={{ fontSize: '20px' }} />,
                name: "Dashboard",
                route: "/admin/dashboard",
                isActive: true,
            })
    }
    if(showRole){
        listMenu.push(
            {
                icon: <UsergroupAddOutlined style={{ fontSize: '20px' }} />,
                name: "Quyền",
                route: "/admin/roles",
                isActive: false,
            })
    }
    if(showUser){
        listMenu.push(
            {
                icon: <UserOutlined style={{ fontSize: '20px' }} />,
                name: "Người dùng",
                route: "/admin/users",
                isActive: false,
            })
    }
    if(showDocument){
        listMenu.push(
            {
                icon: <DownloadOutlined  style={{ fontSize: '20px' }} />,
                name: "Nhập dữ liệu",
                route: "/admin/documents",
                isActive: false,
            })
    }
    if(showApprove){
        listMenu.push(
            {
                icon: <SolutionOutlined style={{ fontSize: '20px' }} />,
                name: "Phê duyệt",
                route: "/admin/approve",
                isActive: false,
            })
    }
    if(showWorkflow){
        listMenu.push(
            {
                icon: <BranchesOutlined style={{ fontSize: '20px' }} />,
                name: "Quy trình phê duyệt",
                route: "/admin/workflows",
                isActive: false,
            })
    }
    const [openUserInfo, setOpenUserInfo] = useState(false);
    const [itemClick, setItemClick] = useState(true);
    const [menus, setMenus] = useState([...listMenu]);
    const navigate = useNavigate();
    const onClickMenu = (route, name) => {

        setMenus([...menus.map(x => {
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
        })]);
        console.log("menus", menus)
        setItemClick(!itemClick);
        navigate(route);
    }

    const onLogout = () => {
        removeToken();
        removeUser()
        navigate("/login");
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
            {menus && menus.map(x => {
                return (
                    <div key={x.name} className="menu_item" >
                        <div className={classNames('menu_item_childen', `${x.isActive ? "menu_item_childen_click" : ""}`)} onClick={() => { onClickMenu(x.route, x.name) }}>
                            {x.icon}
                            <span style={{ fontWeight: "bold" }}>{x.name}</span>
                        </div>
                    </div>
                )

            })}

            <div className="user_avatar" onClick={() => { setOpenUserInfo(!openUserInfo) }}>
                <UserOutlined style={{ color: "#1890ff" }} />
                {openUserInfo && <div className="TOKEN">
                    <div className="user_info_detail">
                        <UserOutlined />
                        <span><b>{currentUser.email}</b></span>
                    </div>
                    <div className="user_info_detail">
                        <KeyOutlined />
                        <span><b>Đổi mật khẩu</b></span>
                    </div>
                    <div className="user_info_detail" onClick={onLogout}>
                        <LoginOutlined />
                        <span><b>Đăng xuất</b></span>
                    </div>
                </div>}
            </div>

        </div>
    )
}