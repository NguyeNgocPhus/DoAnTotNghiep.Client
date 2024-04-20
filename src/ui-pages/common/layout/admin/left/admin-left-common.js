import { Button, Col, Layout, Menu, Row, Input, Tooltip, Typography, Divider } from "antd";


import {
    FolderOpenOutlined,
    UserOutlined,
    BranchesOutlined,
    ProductOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const { Content, Footer } = Layout;
const { Search } = Input;


export const AdminLeftCommomLayout = ({ children }) => {

    const [menu1,setMenu1] = useState(null)
    const [menu2,setMenu2] = useState(null)
    const [menu3,setMenu3] = useState(null)
    const [menu4,setMenu4] = useState(null)
    const navigate = useNavigate();
    const onClickMenu = (route, key) => {
        navigate(route);
        onMenuItemClick(key);
    }
    const onMenuItemClick = (key) =>{
        console.log("key",key)
       if(key === "1"){
         setMenu1("menu_item_childen_click"); 
         setMenu2(null);  
         setMenu3(null);
         setMenu4(null);
       }
       if(key === "1"){
        setMenu1("menu_item_childen_click"); 
        setMenu2(null);  
        setMenu3(null);
        setMenu4(null);
      }
       if(key === "2"){
        setMenu1(null); 
        setMenu2("menu_item_childen_click");  
        setMenu3(null);
        setMenu4(null);
      }
      if(key === "3"){
        setMenu1(null); 
        setMenu2(null);  
        setMenu3("menu_item_childen_click");
        setMenu4(null);
      }
      if(key === "4"){
        setMenu1(null); 
        setMenu2(null);  
        setMenu3(null);
        setMenu4("menu_item_childen_click");
      }
      
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
            <div style={{ margin:'15px 0' }}>

                <Link to="/" className="menu_left">
                    <div className="logo_avatar menu_left">
                        <img src="/admin_logo.svg"></img>
                    </div>
                </Link>
                <div className="divider"></div>
            </div>
            <div className="menu_item" onClick={() => { onClickMenu("/admin/","4") }}>
                <div className={`menu_item_childen ${menu4}`} >
                    <ProductOutlined  style={{ fontSize: '20px' }} />
                    <span>Dashboard</span>
                </div> 
            </div>
            
            <div className="menu_item" onClick={() => { onClickMenu("/admin/identity","1") }}>
                <div className={`menu_item_childen ${menu1}`} >
                    <UserOutlined style={{ fontSize: '20px' }} />
                    <span>Identity</span>
                </div> 
            </div>
            {/* menu_item_childen */}
            <div className="menu_item" onClick={() => { onClickMenu("/admin/documents","2") }}>
                <div className={`menu_item_childen ${menu2}`}>
                    <FolderOpenOutlined style={{ fontSize: '20px'}} />
                    <span>Documents</span>
                </div>
            </div>
            <div className="menu_item" onClick={() => { onClickMenu("/admin/workflows","3") }} >
                <div className={`menu_item_childen ${menu3}`} >
                    <BranchesOutlined style={{ fontSize: '20px' }} />
                    <span>Workflows</span>
                </div>
            </div>
            <div className="user_avatar">
                <Typography.Text style={{ color: '#1890ff' }}>P</Typography.Text>
            </div>

        </div>
    )
}