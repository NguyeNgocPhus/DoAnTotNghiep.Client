
import "./styles.css"
import {EyeOutlined,ShoppingCartOutlined} from "@ant-design/icons";
import { Col, Modal, Rate, Row, Tooltip } from "antd";
import { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export const Product = ({img1,img2,name,price}) =>{
    const [isModalVisible,setIsModalVisible] = useState(false);
    const handleCancel = () =>{
        setIsModalVisible(false);
    }
    const handleOk = () => {
        setIsModalVisible(false);
    };
    return (
        <div>
            <div className="product">
                <div className="product-image">
                    <img src={img1} className="image-product"></img> 
                    <img src={img2} className="image-product__change"></img>
                    <div className="product-info">
                        <div className="info-see" onClick={()=>setIsModalVisible(true)}>
                            <span>Xem nhanh </span>  <EyeOutlined />
                        </div>
                        <div className="info-pay"><span>Mua ngay </span> <ShoppingCartOutlined /></div>
                    </div>   
                </div>
                <h4><b>{name}</b></h4>
                <p>{price} đ</p>
                
            </div>
            <Modal width={1000}  visible={isModalVisible} onCancel={handleCancel} footer={false}>
                <Row gutter={[30,10]}>
                    <Col span={12}>
                        <div className="image-modal">
                            <img src={img1} className="image"></img>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="modal-title">
                            <div className="modal-title__name">ÁO THUN TIED GUN</div>
                            <div>
                                <b>Mã sản phẩm</b> OD-2018
                            </div>
                        </div>
                        <Rate disabled value={2} style={{fontSize:14}}></Rate>
                        <div className="modal-price">
                            <div className="price">199,000</div>
                            <div style={{fontWeight: 700}}>đ</div>
                        </div>
                        <div className="modal-color">
                            <Tooltip title="Đen"><div className="modal-img-color">
                                <img src={img1} className="image"></img>
                            </div></Tooltip>
                            
                            <Tooltip title="Trắng"><div className="modal-img-color">
                                <img src={img1} className="image"></img>
                            </div></Tooltip>
                            <Tooltip title="Đỏ"><div className="modal-img-color">
                                <img src={img1} className="image"></img>
                            </div></Tooltip>
                        </div>
                        <div className="modal-size">
                            <div>Kích thước</div>
                            <div className="list-modal-size">
                                <div className="size">S</div>
                                <div className="size">M</div>
                                <div className="size">XL</div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn">THÊM VÀO GIỎ</button>
                            <div>hoặc <b><Link to="/hello" style={{color:"black"}}>Xem chi tiết</Link></b></div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <Row gutter={[7]}>
                            <Col span={6}>
                                <img src={img1} className="image-footer"></img>
                            </Col>
                            <Col span={6}>
                                <img src={img1} className="image-footer"></img>
                            </Col>
                            <Col span={6}>
                                <img src={img1} className="image-footer"></img>
                            </Col>
                            <Col span={6}>
                                <img src={img1} className="image-footer"></img>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}></Col>
                </Row>
                
            </Modal>
        </div>
    )
}