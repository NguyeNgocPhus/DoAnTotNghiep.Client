import { Col, Layout, Row, Button, Input, Avatar, Badge, Popover } from "antd";

import {
    UserOutlined,
    KeyOutlined,
    LoginOutlined,
    BellOutlined
} from '@ant-design/icons';
import { AdminLeftCommomLayout } from "./left/admin-left-common";
import { getUser, removeToken, removeUser } from "../../../../app-helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "./notification";
const { Content, Footer } = Layout;
const { Search } = Input;

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export const AdminCommomLayout = ({ children }) => {

    var currentUser = getUser();
    const [openUserInfo, setOpenUserInfo] = useState(false);
    const navigate = useNavigate();
    const onLogout = () => {
        removeToken();
        removeUser()
        navigate("/login");
    }
    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    return (
        <div className="fullScreen">
            <Row>
                <Col span={3}>
                    <AdminLeftCommomLayout></AdminLeftCommomLayout>
                </Col>
                <Col span={21}>
                    <div className="header_common">
                        <Popover
                            content={<Notification></Notification>}
                            placement="bottom"
                            trigger="click"
                            open={open}
                            overlayStyle={{
                                width: "250px",
                                height: "200px"
                            }}
                            onOpenChange={handleOpenChange}
                        >
                            <Badge count={1} onClick={() => { setOpen(true) }}>
                                <Avatar
                                    style={{
                                        backgroundColor: 'white',
                                        cursor: 'pointer',
                                        boxShadow:'1px 1px 5px 3px rgba(0,0,0,.05)'
                                    }}
                                    icon={<BellOutlined style={{ color: "black" }} />}
                                >
                                </Avatar>
                            </Badge>
                        </Popover>


                        <div className="user_avatar" onClick={() => { setOpenUserInfo(!openUserInfo) }}>
                            <div className="default_user">
                                <img className="default_avatar"src="/default-avatar.png"></img>
                                <span><b>{currentUser?.email}</b></span>
                            </div>

                            {openUserInfo && <div className="TOKEN">
                                <div className="user_info_detail">
                                    <UserOutlined />

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
                    {children}
                </Col>
            </Row>


        </div>
    )
}