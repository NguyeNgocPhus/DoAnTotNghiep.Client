import { Carousel, Col, Drawer, Row } from "antd"
import { CommomLayout } from "../common/layout"
import home1 from "../../img/home1.jpg";
import home2 from "../../img/home2.jpg";
import { LeftOutlined,RightOutlined } from "@ant-design/icons";
import "./styles.css";
import layoutAoNi from "../../img/layout/layout-aoni.jpg"
import layoutAoKhoac from "../../img/layout/layout-aokhoac.jpg"
import layoutAoPhong from "../../img/layout/layout-aophong.jpg"
import layoutBalo from "../../img/layout/layout-balo.jpg"
import layoutSet from "../../img/layout/layout-set.jpg"
import layoutQuan from "../../img/layout/layout-quan.jpg"
import seperate from "../../img/seperate-icon.png";
import underline from "../../img/underline-ic.png";

import { ListNewProduct } from "./product/NewProduct";
import { Link } from "react-router-dom";
import { SaleBetterProduct } from "./product/SaleBetterProduct";


export const HomePage = () =>{
  
    


    return (
        <CommomLayout>
          <div style={{position:'relative'}}>
            
            <Carousel autoplay>
              <div>
                <img src={home1}></img>
              </div>
              <div>
                <img src={home2}></img>
              </div>        
            </Carousel>
            <div className="btn-next-left"><LeftOutlined style={{ fontSize: '26px'}}/></div>
            <div className="btn-next-right"><RightOutlined style={{ fontSize: '26px'}}/></div>

          </div>
          <div className="layout-product">
            <div className="layout-product__item">
              <img src={layoutAoNi} className="layout-image"></img>
            </div>
            <div className="layout-product__item">
              <img src={layoutBalo} className="layout-image"></img>
            </div>
            <div className="layout-product__item">
              <img src={layoutQuan} className="layout-image"></img>
            </div>
            <div className="layout-product__item">
              <img src={layoutSet} className="layout-image"></img>
            </div>
            <div className="layout-product__item">
              <img src={layoutAoKhoac} className="layout-image"></img>
            </div>
            <div className="layout-product__item">
              <img src={layoutAoPhong}className="layout-image"></img>
            </div> 
          </div>
          <div className="layout-new-product">
            <h2><b>SẢN PHẨM MỚI</b></h2>
            <div>
              <img src={seperate}></img>
            </div>
            <Link to="/new" style={{color:"black",marginTop:10}}>Xem thêm</Link>
            <ListNewProduct></ListNewProduct>
          </div>
          <div className="layout-saleBetter-product">
            <h2><b>SẢN PHẨM BÁN CHẠY</b></h2>
              <div>
                <img src={seperate}></img>
              </div>
              <Link to="/new" style={{color:"black",marginTop:10}}>Xem thêm</Link>
              <SaleBetterProduct></SaleBetterProduct>
          </div>
          
        </CommomLayout>
    )
}