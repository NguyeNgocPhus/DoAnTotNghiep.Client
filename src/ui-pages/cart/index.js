import { Col, Drawer, Input, InputNumber, Row } from "antd"


// import {SearchOutlined} from "@antd/icons"
import {SearchOutlined,CloseOutlined,ArrowRightOutlined  } from "@ant-design/icons";
import react ,{useState} from "react";
import ao from "../../img/ao/ao-phong-odin/25032022090342_mock_up_2053.jpg";
import "./styles.css";
export const Cart = ({visibleStore,onCloseStore}) =>{
    
    const convertToVND = (money) =>{
        // return str.split('').reverse().reduce((prev, next, index) => {
        //     return ((index % 3) ? next : (next + ',')) + prev
        // })
        return money.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})
    }
    return (
    
            <Drawer zIndex={100000}  width={480} bodyStyle={{ padding: 70 }} placement="right" onClose={onCloseStore} visible={visibleStore}>
                <h3>GIỎ HÀNG</h3>
                <div>
                    <Row gutter={[10,10]} className={"cart-product"}>
                        <Col span={6}>
                            <div className={"cart-image"}>
                                <img src={ao}></img>
                            </div>
                        </Col>
                        <Col span={16} >
                            <div className="cart-title">ÁO TANKTOP OVERSIZE LEASTREET - H - HỒNG</div>
                            <div className={"cart-info"}>
                                <InputNumber defaultValue={0} min={0}></InputNumber>
                                <div>{convertToVND(1000000)}</div>
                            </div>
                           
                        </Col>
                        <Col span={2} className={'cart-remove'}> 
                            <div>
                                <CloseOutlined style={{fontSize:"12px"}}/>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={'cart-price'}>
                    <span>Tổng tiền</span>
                    <span>100000 VND</span>

                </div>
                <Row gutter={[20,20]} style={{marginTop:"10px"}}>
                    <Col span={12}>
                        <button className={"btn-cart"}>MUA THÊM</button>
                    </Col>
                    <Col span={12}>
                        <button className={"btn-cart"}>THANH TOÁN</button>
                    </Col>
                   

                </Row>
                <div className={"cart-next"}>
                    <span>Xem giỏ hàng</span>
                    <ArrowRightOutlined style={{fontSize:"10px"}} />
                </div>
               
            </Drawer> 
        
    )
}