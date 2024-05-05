import { Button, Col, Divider, Form, Input, notification, Row } from "antd"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { CommomLayout } from "../../common/layout"
import "./styles.css";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { useUserLogin } from "../../../store/auth/use-user-login";
import { REQUEST_STATE } from "../../../app-config/constants";
import { myProfileState } from "../../../store/auth/share-state";
import { useRecoilState } from "recoil";
import { getUserInfo, saveUserInfoToStore, saveUserToStore } from "../../../app-helper";
import Typography from "antd/lib/typography/Typography";
import { useProfile } from "../../../store/auth/use-my-profile";

export const UserSignIn = () => {
    const [userLoginData, requestUserLoginData] = useUserLogin();
    const [myProfile, requestMyProfile] = useProfile();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onFinish = () => {
        requestUserLoginData({
            email: email,
            password: password
        })
    }
    useEffect(() => {
        if (userLoginData.state === REQUEST_STATE.ERROR) {
            // console.log(userLoginData);
            notification.error({
                message: "LỖI",
                description: userLoginData.message,
                placement: 'topRight',
                duration: 5,
            })
        } else if (userLoginData.state === REQUEST_STATE.SUCCESS) {
            saveUserInfoToStore(userLoginData.data);
            requestMyProfile();
        }
    }, [userLoginData])

    useEffect(() => {

        if (myProfile.state === REQUEST_STATE.SUCCESS) {
          saveUserToStore(myProfile.data);
          navigate("/admin");
        }
    
      }, [myProfile])

    return (
        <>
            <Row style={{height:'100vh',backgroundColor:'#f0f0f0'}}>
            
                <Col span={8} style={{ margin:'auto'}} >
                    <div className="login_logo">
                        <img src="/admin_logo.svg" style={{height: "100%",
                        margin: "auto"}}></img>
                    </div>
                   <div  className="form_sigin" >
                    <div style={{textAlign:"center"}}><h2 ><b>Đăng nhập</b></h2></div>
                    <Divider></Divider>
                    <Form
                        onFinish={onFinish}
                    >
                        <Form.Item label=""
                            name="email" rules={[
                                {
                                    required: true,
                                    message: "Fill your email",
                                }
                            ]}
                            onChange={onChangeEmail}
                        >
                            <Input placeholder="Tên người dùng hoặc email" prefix={<UserOutlined style={{fontSize:"18px", marginRight:"10px",color:"#8d9ba9"}}/>}  className="input-email input-signin">
                            </Input>
                        </Form.Item>
                        <Form.Item label=""
                            name="password" rules={[
                                {
                                    required: true,
                                    message: "Fill your password",
                                }
                            ]}
                            onChange={onChangePassword}
                        >
                            <Input.Password prefix={<KeyOutlined style={{fontSize:"18px", marginRight:"10px",color:"#8d9ba9"}}/>} placeholder="Mật khẩu" className="input-password input-signin" >
                            </Input.Password>
                        </Form.Item>
                        <Form.Item>
                            <button type="primary" className="btn-signin">
                                Đăng nhập
                            </button>
                        </Form.Item>

                    </Form>

                    <Divider>Hoặc</Divider>
                    {/* <button className="signin-by-fb ">
                        <FacebookFilled style={{ fontSize: '20px' }} /><span>Đăng nhập bằng tài khoản facebook</span>
                    </button> */}
                    <button className="btn-signin">
                        Đăng nhập qua SSO 
                    </button>
                    </div>
                </Col>
            </Row>
        </>
    )
}