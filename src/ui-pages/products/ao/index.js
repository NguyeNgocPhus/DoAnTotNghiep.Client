
import { Col, Modal, Row, Select } from "antd"
import { useEffect, useState } from "react"
import { FieldItem } from "../../common/FieldItem"
import { CommomLayout } from "../../common/layout"
import "./styles.css";
import {EyeOutlined,ShoppingCartOutlined} from "@ant-design/icons";
import ao1 from "../../../img/ao/ao-ni/6bec6b04ec20207e7931.jpg";
import ao2 from "../../../img/ao/ao-ni/24012022100142_mock_up_1669.jpg";
import ao3 from "../../../img/ao/ao-ni/12012022100141_mock_up_1627_den.jpg";
import ao4 from "../../../img/ao/ao-ni/24012022100138_mock_up_1674.jpg";
import ao5 from "../../../img/ao/ao-ni/24012022100153_mock_up_1672.jpg";
import { Product } from "../../common/product";



const { Option } = Select;

export const PageAo =()=>{
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
                <FieldItem></FieldItem>
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
                        <Col span={8}>
                           <Product img1={ao1} img2={ao2} name={"áo thu đông đẹp vl"} price={"123,000,000"}></Product>
                        </Col>
                        <Col span={8}>
                           <Product img1={ao3} img2={ao4} name={"áo thu đông đẹp vl"} price={"123,000,000"}></Product>
                        </Col>
                        <Col span={8}>
                           <Product img1={ao4} img2={ao5} name={"áo thu đông đẹp vl"} price={"123,000,000"}></Product>
                        </Col>
                        <Col span={8}>
                           <Product img1={ao5} img2={ao1} name={"áo thu đông đẹp vl"} price={"123,000,000"}></Product>
                        </Col>
                        <Col span={8}>
                           <Product img1={ao5} img2={ao1} name={"áo thu đông đẹp vl"} price={"123,000,000"}></Product>
                        </Col>
                        <Col span={8}>
                           <Product img1={ao5} img2={ao1} name={"áo thu đông đẹp vl"} price={"123,000,000"}></Product>
                        </Col>
                        <Col span={8}>
                           <Product img1={ao5} img2={ao1} name={"áo thu đông đẹp vl"} price={"123,000,000"}></Product>
                        </Col>
                        <Col span={8}>
                           <Product img1={ao5} img2={ao1} name={"áo thu đông đẹp vl"} price={"123,000,000"}></Product>
                        </Col>
                        <Col span={8}>
                           <Product img1={ao5} img2={ao1} name={"áo thu đông đẹp vl"} price={"123,000,000"}></Product>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </CommomLayout>
    )
}