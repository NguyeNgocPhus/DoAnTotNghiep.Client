

import {
    UsergroupAddOutlined,
    UserOutlined,
    BranchesOutlined,
    ProductOutlined,
    SolutionOutlined,
    DownloadOutlined} from '@ant-design/icons';
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../../../../app-helper";
import { hasRole } from "../../../../../app-helper/jwtHepler";
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
    const location = useLocation();
   
    if(showDashboard){
        
        listMenu.push(
            {
                icon: <ProductOutlined style={{ fontSize: '20px' }} />,
                name: "Dashboard",
                route: "/admin/dashboard",
                isActive: location.pathname === "/admin/dashboard",
            })
    }
    if(showRole){
        listMenu.push(
            {
                icon: <UsergroupAddOutlined style={{ fontSize: '20px' }} />,
                name: "Quyền",
                route: "/admin/roles",
                isActive: location.pathname === "/admin/roles",
            })
    }
    if(showUser){
        listMenu.push(
            {
                icon: <UserOutlined style={{ fontSize: '20px' }} />,
                name: "Người dùng",
                route: "/admin/users",
                isActive: location.pathname === "/admin/users",
            })
    }
    if(showDocument){
        listMenu.push(
            {
                icon: <DownloadOutlined  style={{ fontSize: '20px' }} />,
                name: "Nhập dữ liệu",
                route: "/admin/documents",
                isActive: location.pathname === "/admin/documents",
            })
    }
    if(showApprove){
        listMenu.push(
            {
                icon: <SolutionOutlined style={{ fontSize: '20px' }} />,
                name: "Phê duyệt",
                route: "/admin/approve",
                isActive:  location.pathname === "/admin/approve",
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

            

        </div>
    )
}