
import { Col, Row } from "antd";
import betterSale from "../../../img/saleBetter.jpg";
import newAo1 from "../../../img/ao/ao-ni/24012022100153_mock_up_1672.jpg";

import {EyeOutlined,ShoppingCartOutlined} from "@ant-design/icons";

export const SaleBetterProduct = () =>{


    return (

       <Row style={{width:"100%",marginTop:"32px",padding:"0 20px"}}>
           <Col span={12}>
                <div className="listSaleBetterProduct">
                    <div className="new-product">
                        <div className="new-product-image">
                            <img src={newAo1} className="image-product"></img> 
                            {/* <img src={newAo2} className="image-product__change"></img> */}
                            <div className="product-info">
                                <div className="info-see">
                                    <span>Xem nhanh </span>  <EyeOutlined />
                                </div>
                                <div className="info-pay"><span>Mua ngay </span> <ShoppingCartOutlined /></div>
                            </div>   
                        </div>
                        <h4><b>QUẦN NỈ TRƠN BÓ ÂU</b></h4>
                            <p>150,000 đ</p>
                    </div>
                    <div className="new-product">
                        <div className="new-product-image">
                            <img src={newAo1} className="image-product"></img> 
                            {/* <img src={newAo2} className="image-product__change"></img> */}
                            <div className="product-info">
                                <div className="info-see">
                                    <span>Xem nhanh </span>  <EyeOutlined />
                                </div>
                                <div className="info-pay"><span>Mua ngay </span> <ShoppingCartOutlined /></div>
                            </div>   
                            
                        </div><h4><b>QUẦN NỈ TRƠN BÓ ÂU</b></h4>
                            <p>150,000 đ</p>
                    </div>
                 </div>

           </Col>
           <Col span={12}>
            <img src={betterSale} className="img-better-sale"></img>
           </Col>

       </Row>
    )
}