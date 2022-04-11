import { Button, Col, Divider, Input, Row } from "antd"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { CommomLayout } from "../../common/layout"
import "./styles.css";
import {ArrowLeftOutlined} from "@ant-design/icons";

export const UserSignUp = () =>{
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const onGoBack = () =>{
        navigate("/")
    }

    return (
        <CommomLayout>
            <Row>
                <Col span={12} style={{padding:"200px 153px", borderRight: "2px solid #f0f2f5",height:'650px'}}>
                    <div className="text-signin">
                        <p>ĐĂNG KÍ</p>
                    </div>
                </Col >
                <Col span={12} style={{padding:"150px 100px"}}>
                    <Input placeholder="Họ tên" className="input-email input-signin"  style={{marginBottom:10}}>
                    </Input>
                    <Input placeholder="Email" className="input-password input-signin"  style={{marginBottom:10}}>
                    </Input>
                    <Input placeholder="Mật khẩu" className="input-password input-signin"  style={{marginBottom:10}}>
                    </Input>
                    <Input placeholder="Số điện thoại" className="input-password input-signin"  style={{marginBottom:10}}>
                    </Input>
                    <button className="btn-signin">Đăng kí</button>
                    <div  className="btn-back-home" onClick={onGoBack}><ArrowLeftOutlined /><span>Quay về trang chủ</span></div>
                    

                </Col>
            </Row>
        </CommomLayout>
    )
}