import { Button, Col, Divider, Input, Row } from "antd"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { CommomLayout } from "../../common/layout"
import "./styles.css";
import {ArrowLeftOutlined} from "@ant-design/icons";

export const GetPassword = () =>{
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // const onGoBack = () =>{
    //     navigate("/")
    // }

    return (
        <CommomLayout>
            <Row>
                <Col span={12} style={{padding:"200px 153px", borderRight: "2px solid #f0f2f5",height:'650px'}}>
                    <div className="text-signin">
                        <p>QUÊN MẬT KHẨU</p>
                    </div>
                </Col >
                <Col span={12} style={{padding:"150px 100px"}}>
                    <p><span style={{color:"red"}}>*</span> Nhập địa chỉ email:</p>
                    <Input placeholder="Email" className="input-email input-signin"  style={{marginBottom:10}}>
                    </Input>
                    <button className="btn-signin">Xác nhận</button>
                    {/* <div  className="btn-back-home" onClick={onGoBack}><ArrowLeftOutlined /><span>Quay về trang chủ</span></div> */}
                    

                </Col>
            </Row>
        </CommomLayout>
    )
}