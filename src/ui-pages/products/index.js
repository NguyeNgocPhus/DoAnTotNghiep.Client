
import { Col, Modal, Row, Select } from "antd"
import { useEffect, useState } from "react"
import { FieldItem } from "../common/FieldItem"
import { CommomLayout } from "../common/layout"
import "./styles.css";
import {EyeOutlined,ShoppingCartOutlined} from "@ant-design/icons";
import ao1 from "../../img/ao/ao-ni/6bec6b04ec20207e7931.jpg";
import ao2 from "../../img/ao/ao-ni/24012022100142_mock_up_1669.jpg";
import ao3 from "../../img/ao/ao-ni/12012022100141_mock_up_1627_den.jpg";
import ao4 from "../../img/ao/ao-ni/24012022100138_mock_up_1674.jpg";
import ao5 from "../../img/ao/ao-ni/24012022100153_mock_up_1672.jpg";
import { Product } from "../common/product";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useGetAllProduct } from "../../store/product/use-get-product";
import { REQUEST_STATE } from "../../app-config/constants";



const { Option } = Select;

export const PageProduct =({})=>{
    
  
    const[listProduct,requestSetListProduct] = useGetAllProduct();
    const [dataListProduct,setDataListProduct] = useState([]);
    const [listColorCode,setListColorCode] = useState([]);
    const [listColorName,setListColorName] = useState([]);
    const [listSize,setListSize] = useState([]);
    const [typeProduct,setTypeProduct] = useState('');
    useEffect(()=>{
        const path =window.location.pathname.slice(1);
        console.log(window.location.search);
        requestSetListProduct(path);
    },[ window.location.pathname])
    // console.log(listSize);
    useEffect(()=>{
        if(listProduct.state === REQUEST_STATE.SUCCESS){
            let code = [],name = [], products=[];
            listProduct.data.data.products.forEach((product)=>{
                products.push(product);
            })
            setListSize(listProduct.data.size);
  
            listProduct.data.colors.forEach((color)=>{
                code.push(color.colorCode);
                name.push(color.colorName)
            })
            setListColorCode(code);
            setListColorName(name);
            setDataListProduct(products);
            setTypeProduct(`${listProduct.data.data.type}/${listProduct.data.data.nameSlug}`);

        }
    },[listProduct])

    const [valueFieldSelect,setValueSelect] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <CommomLayout>
            <div style={{marginTop:50,backgroundColor:"#f0f2f5",height:"35px", display: "flex",alignItems: "center"}}>
                <div className="title-page">Trang chủ / Áo</div>
                
            </div>
            <Row style={{paddingTop:40}} >
                <FieldItem listColorCode={listColorCode} listColorName={listColorName} listSize={listSize}></FieldItem>
                <Col span={20} style={{padding:"0 15px"}}>
                    <div className="select-rate">
                        <Select showArrow placeholder={"chon di"} value ={valueFieldSelect} style={{width:120}}>
                            <Option key="" value='' title="Tuỳ chọn">Tuỳ chọn</Option>
                            <Option key="new" value='new' title="Mới nhất">Mới nhất</Option>
                            <Option key="bestseller" value={'bestseller'} title="Bán chạy">Bán chạy</Option>
                            <Option key="priceAsc" value={'priceAsc'} title="Giá giảm dần">Giá giảm dần</Option>
                            <Option key="priceDesc" value={'priceDesc'} title="Giá tăng dần">Giá tăng dần</Option>
                            <Option key="nameAsc" value={'nameAsc'} title="Theo bảng chữ cái A-Z">Theo bảng chữ cái A-Z</Option>
                            <Option key="nameDesc" value={'nameDesc'} title="Theo bảng chữ cái Z-A">Theo bảng chữ cái Z-A</Option>
                        </Select>
                    </div>
                    <Row gutter={[10,20]}>
                       {dataListProduct.length && dataListProduct.map((product , index)=>{
                           return (
                            <Col span={8}>
                                <Product key={index} product={product} type={typeProduct} listSize={listSize} img1={ao1} img2={ao2}></Product>
                            </Col>
                           )
                       })}
                    </Row>
                </Col>
            </Row>
        </CommomLayout>
    )
}