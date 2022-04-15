
import "./styles.css"
import {EyeOutlined,ShoppingCartOutlined} from "@ant-design/icons";
import { Col, Modal, Rate, Row, Tooltip } from "antd";
import { useState,useEffect } from "react";
import "./styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Configs } from "../../../app-config/api";

export const Product = ({product,type,listSize,img1,img2}) =>{
    
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [valueRating,setValueRating] = useState(0);
    const [listColor,setListColor] = useState({});
    const [listImage,setListImage] = useState({});
    const location = useLocation();

    const navigate = useNavigate();
    useEffect(()=>{
        if(product){
            const colors = [];
            const images = [];
            product.productDetails.map(dt=>{
                colors.push({
                    colorName:dt.colorName,
                    colorCode:dt.colorCode
                })
                dt.images.map(image=>{
                   const pathImage = Configs.BASE_API + `/${type}/${image.name}`;
                   images.push(pathImage);
                })
            })
            
            setValueRating(product.rating); 
            setListColor(colors);
            setListImage(images);
        }
       
    },[product])
    const handleCancel = () =>{
        setIsModalVisible(false);
    }
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const convertToVND = (money) =>{
        return money.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})
    }
    return (
        <div>
            <div className="product">
                <div className="product-image">
                    <div className="image-product"><img src={img1} className="image-click"></img> </div>   
                    
                    <img src={img2}   onClick={()=>navigate(`/${location.state}/${product.nameSlug}_${product.id}`,{
                        state:{
                            product : product,
                            listColor: listColor,
                            listImage : listImage,
                            listSize:listSize
                        }
                    })} className="image-product__change"></img>
                    <div className="product-info">
                        <div className="info-see" onClick={()=>setIsModalVisible(true)}>
                            <span>Xem nhanh </span>  <EyeOutlined />
                        </div>
                        <div className="info-pay"><span>Mua ngay </span> <ShoppingCartOutlined /></div>
                    </div>   
                </div>
                <h4><b>{product.normalizedName}</b></h4>
                <p>{convertToVND(product.price)}</p>
                
            </div>
            <Modal width={1000}  visible={isModalVisible} onCancel={handleCancel} footer={false}>
                <Row gutter={[30,10]}>
                    <Col span={12}>
                        <div className="image-modal">
                            {listImage.length>0 && <img src={listImage[0]} className="image"></img>} 
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="modal-title">
                            <div className="modal-title__name">{product.normalizedName}</div>
                            <div>
                                <b>Mã sản phẩm</b> {product.code}
                            </div>
                        </div>
                        <Rate disabled value={valueRating} style={{fontSize:14}}></Rate>
                        <div className="modal-price">
                            <div className="price">{convertToVND(product.price)}</div>
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
                            {listImage.length>0 && listImage.map((img,index)=>{
                                return (
                                    <Col key={index} span={6}>
                                        <img src={img1} className="image-footer"></img>
                                    </Col>
                                )
                            })}                            
                        </Row>
                    </Col>
                    <Col span={12}></Col>
                </Row>
                
            </Modal>
        </div>
    )
}