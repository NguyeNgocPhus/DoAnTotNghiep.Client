import { Col, Layout, Row, Button, Input, Avatar, Badge, Popover } from "antd";

import {
    UserOutlined,
    KeyOutlined,
    LoginOutlined,
    BellOutlined
} from '@ant-design/icons';
import { AdminLeftCommomLayout } from "./left/admin-left-common";
import { getToken, getUser, removeToken, removeUser } from "../../../../app-helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "./notification";
import { useGetListNotification } from "../../../../store/notification/use-get-list-notification";
import { REQUEST_STATE } from "../../../../app-config/constants";
import { getCoutUnreadNotificationState } from "../../../../store/notification/share-state";
import { useRecoilState } from "recoil";

export const HeaderCommomLayout = ({ children }) => {

    const [listNoficationApiData, requestGetListNotification] = useGetListNotification();
    const [countUnreadNotificationData, setCountUnreadNotificationData] = useRecoilState(getCoutUnreadNotificationState);


    var currentUser = getUser();
    const [openUserInfo, setOpenUserInfo] = useState(false);
    const [countUnread, setCountUnread] = useState(0);
    const navigate = useNavigate();
    const onLogout = () => {
        removeToken();
        removeUser()
        navigate("/login");
    }

    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen) => {

        if (newOpen) {
            requestGetListNotification({
                page: 1
            });
        }
        setOpen(newOpen);
    };
    useEffect(() => {
       console.log("countUnreadNotificationData",countUnreadNotificationData)
    }, [countUnreadNotificationData])

    return (
        <div className="header_common">
            <Popover
                content={<Notification></Notification>}
                placement="bottom"
                trigger="click"
                open={open}
                overlayStyle={{
                    width: "250px",
                    height: "500px",
                    // overflow: "scroll"
                }}
                onOpenChange={handleOpenChange}
            >
                <Badge count={countUnreadNotificationData} onClick={() => { setOpen(true) }}>
                    <Avatar
                        style={{
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            boxShadow: '1px 1px 5px 3px rgba(0,0,0,.05)'
                        }}
                        icon={<BellOutlined style={{ color: "black" }} />}
                    >
                    </Avatar>
                </Badge>
            </Popover>


            <div className="user_avatar" onClick={() => { setOpenUserInfo(!openUserInfo) }}>
                <div className="default_user">
                    <img className="default_avatar" src="/default-avatar.png"></img>
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
    )
}