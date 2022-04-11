import { Button, Col, Divider, Form, Input, notification, Row } from "antd"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { CommomLayout } from "../../common/layout"
import "./styles.css";
import {FacebookFilled,GooglePlusCircleFilled} from "@ant-design/icons";
import { useUserLogin } from "../../../store/auth/use-user-login";
import { REQUEST_STATE } from "../../../app-config/constants";
import { myProfileState } from "../../../store/auth/share-state";
import { useRecoilState } from "recoil";

export const UserSignIn = () =>{
    const [userLoginData,requestUserLoginData] = useUserLogin();
    const [myprofile,setMyprofile] = useRecoilState(myProfileState);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();
    const onChangeEmail = (e) =>{
        setEmail(e.target.value)
    }
    const onChangePassword = (e)=>{
        setPassword(e.target.value)
    }
    const onFinish = () =>{
        requestUserLoginData({
            email:email,
            password:password
        })
    }
    useEffect(()=>{
        if(myprofile.state === REQUEST_STATE.SUCCESS){
            navigate("/profile")
        }
       
    },[myprofile])

    useEffect(()=>{
        if(userLoginData.state === REQUEST_STATE.ERROR){
            // console.log(userLoginData);
            notification.error({
                message:"LỖI",
                description:userLoginData.message,
                placement: 'topRight',
                duration: 5,
            })
        }else if(userLoginData.state === REQUEST_STATE.SUCCESS){
            navigate("/")
        }
    },[userLoginData])
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <CommomLayout>
            <Row>
                <Col span={12} style={{padding:"200px 153px", borderRight: "2px solid #f0f2f5",height:'650px'}}>
                    <div className="text-signin">
                        <p>ĐĂNG NHẬP</p>
                    </div>
                </Col >
                <Col span={12} style={{padding:"150px 100px"}}>
                    <Form 
                        onFinish={onFinish}
                    >
                        <Form.Item label=""
                            name="email"  rules={[
                                {
                                    required: true,
                                    message: "nhap email",
                                }
                            ]}
                            onChange={onChangeEmail}
                            >
                            <Input placeholder="Email" className="input-email input-signin">
                            </Input>
                        </Form.Item>
                        <Form.Item  label=""
                                name="password" rules={[
                                {
                                    required: true,
                                    message:"nhap password",
                                }
                            ]}
                            onChange={onChangePassword}
                            >
                            <Input placeholder="Mật khẩu" className="input-password input-signin" >
                            </Input>          
                        </Form.Item>
                        <Form.Item>
                                <button type="primary" className="btn-signin">
                                    Submit
                                </button>
                         </Form.Item>

                    </Form>
                    
                    
                    <div className="auth-link">
                        <Link to="/user/getpassword">Quên mật khẩu ?</Link>
                        <Link to="/user/signup">Đăng kí</Link>
                    </div>
                    <Divider>Hoặc</Divider>
                    <button className="signin-by-fb ">
                        <FacebookFilled style={{ fontSize: '20px' }}/><span>Đăng nhập bằng tài khoản facebook</span>
                    </button>
                    <button className="signin-by-google">
                        <GooglePlusCircleFilled style={{ fontSize: '20px' }}/><span>Đăng nhập bằng tài khoản google</span>
                    </button>

                </Col>
            </Row>
        </CommomLayout>
    )
}