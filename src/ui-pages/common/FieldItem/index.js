import { Col, Row, Slider } from "antd"
import { useState } from "react"
import {PlusOutlined,MinusOutlined} from "@ant-design/icons";
import "./styles.css"


export const FieldItem = () =>{

    const [valueSlider,setValueSlider] = useState([0,100]); 
    const [visibleProduct,setVisibleProduct] = useState(true);
    const [visibleColor,setVisibleColor] = useState(true);
    const [visibleSize,setVisibleSize] = useState(true);

    ///console.log(valueSlider);

    const onChangeSlider = (e) =>{
        setValueSlider(e);
    }
    var colors = [];
    while (colors.length < 30) {
        do {
            var color = Math.floor((Math.random()*1000000)+1);
        } while (colors.indexOf(color) >= 0);
        colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    }
    
    return (
        <Col span={4}  className="fielItem">
            <div style={{height:"10px",fontWeight:700,display:"flex",alignItems:"center"}}>GIÁ -</div>
            <Slider range  value={valueSlider} trackStyle={{color:"black"}} onChange={onChangeSlider} ></Slider>
            <div>122,101 ₫ - 2,226,268 ₫</div>
            <div style={{height:"10px",fontWeight:700,margin:"20px 0",display:"flex",alignItems:"center",gap:"0 5px"}}>SẢN PHẨM 
                {!visibleProduct && <PlusOutlined style={{fontSize:10}} onClick={()=>setVisibleProduct(true)}/>}
                {visibleProduct && <MinusOutlined style={{fontSize:10}} onClick={()=>setVisibleProduct(false)}/>}
            </div>
            <ul className="list-field-product" style={{display:`${visibleProduct ? "block":"none"}`}}>
                <li className="field-item">ÁO TANKTOP</li>
                <li className="field-item">ÁO NỈ</li>
                <li className="field-item">ÁO PHÔNG ODIN</li>
                <li className="field-item">ÁO KHOÁC</li>
                <li className="field-item">ÁO POLO</li>
                <li className="field-item">ÁO SƠMI</li>

            </ul>
            <div style={{height:"10px",fontWeight:700,margin:"20px 0",display:"flex",alignItems:"center",gap:"0 5px"}}>MÀU SẮC
                {!visibleColor && <PlusOutlined style={{fontSize:10}} onClick={()=>setVisibleColor(true)}/>}
                {visibleColor && <MinusOutlined style={{fontSize:10}} onClick={()=>setVisibleColor(false)}/>}
            </div>
            <div style={{display:`${visibleColor ? "block":"none"}`}}>
                    <Row className="field-color" gutter={[10,10]} >
                        {
                            colors.map((color,index)=>{
                                return (
                                    <Col span={12} key={index} style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"0 3px"}}>
                                        <div className="select-color" style={{backgroundColor:`${color}`}}></div>
                                        <div style={{fontSize:12}}>xanh đậm</div>
                                    </Col>
                                )
                            })  
                        }
                    </Row>
            </div>
            <div style={{height:"10px",fontWeight:700,margin:"20px 0",display:"flex",alignItems:"center",gap:"0 5px"}}>KÍCH CỠ
                {!visibleSize && <PlusOutlined style={{fontSize:10}} onClick={()=>setVisibleSize(true)}/>}
                {visibleSize && <MinusOutlined style={{fontSize:10}} onClick={()=>setVisibleSize(false)}/>}
            </div>
            <div style={{display:`${visibleSize ? "block":"none"}`}}>
                <Row gutter={[10,10]}>
                    <Col span={12} style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"0 3px"}}>
                        <div className="select-size"></div>
                        <div>M</div>
                    </Col>
                    <Col span={12}  style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"0 3px"}}>
                        <div className="select-size"></div>
                        <div>S</div>
                    </Col>
                    <Col span={12}  style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"0 3px"}}>
                        <div className="select-size"></div>
                        <div>L</div>
                    </Col>
                    <Col span={12}  style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"0 3px"}}>
                        <div className="select-size"></div>
                        <div>XL</div>
                    </Col>
                    <Col span={12}  style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"0 3px"}}>
                        <div className="select-size"></div>
                        <div>XXL</div>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}