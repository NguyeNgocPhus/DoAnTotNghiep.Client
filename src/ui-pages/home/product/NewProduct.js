import "./styles.css";
import newAo1 from "../../../img/ao/ao-phong-odin/25032022090342_mock_up_2053.jpg";
import newAo2 from "../../../img/ao/ao-phong-odin/28032022100337_mock_up_2075.jpg";
import ao1 from "../../../img/ao/ao-ni/6bec6b04ec20207e7931.jpg";
import ao2 from "../../../img/ao/ao-ni/24012022100142_mock_up_1669.jpg";
import {EyeOutlined,ShoppingCartOutlined} from "@ant-design/icons";
export const ListNewProduct = () =>{



    return (
        <div className="listNewProduct">
            <div className="new-product">
                <div className="new-product-image">
                    <img src={newAo1} className="image-product"></img> 
                    <img src={newAo2} className="image-product__change"></img>
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
                    <img src={ao1} className="image-product"></img> 
                    <img src={ao2} className="image-product__change"></img>
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
    )
}