import { Checkbox, Col, Row, Slider } from "antd"
import { useState } from "react"
import {PlusOutlined,MinusOutlined,CheckOutlined} from "@ant-design/icons";
import "./styles.css"
import colors from "../../../data/color.json";
import checkbox from "../../../img/123.png";

export const FieldItem = ({listColorCode,listColorName,listSize}) =>{

    const [valueSlider,setValueSlider] = useState([0,100]); 
    const [visibleProduct,setVisibleProduct] = useState(true);
    const [visibleColor,setVisibleColor] = useState(true);
    const [visibleSize,setVisibleSize] = useState(true);
    const [price,setPrice] = useState([0,3000000]);
    const [displayColor,setDisplayColor] = useState(false);
    const [displaySize,setDisplaySize] = useState(false);
    const onChangeSlider = (e) =>{
        setValueSlider(e);
        setPrice([3000000*(e[0]/100),3000000*(e[1]/100)]);
    }
    
    const convertToVND = (money) =>{
        return money.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})
    }
    const setColorHandler = (color) =>{
        if(displayColor){
            document.querySelector(`.checkbox-${color}`).style.display = "block";
            setDisplayColor(false);
        }else{
            document.querySelector(`.checkbox-${color}`).style.display = "none";
            setDisplayColor(true);
        }
    }
    const setSizeHandler = (size) =>{
        if(displaySize){
            document.querySelector(`.${size}`).style.display = "block";
            setDisplaySize(false);
        }else{
            document.querySelector(`.${size}`).style.display = "none";
            setDisplaySize(true);
        }
    }   

   
    return (
        <Col span={4}  className="fielItem">
            <div style={{height:"10px",fontWeight:700,display:"flex",alignItems:"center"}}>GIÁ -</div>
            <Slider tooltipVisible={false} range value={valueSlider} onChange={onChangeSlider} ></Slider>
            <div style={{fontSize:12,fontWeight:500}}>{convertToVND(price[0])} - {convertToVND(price[1])}</div>
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
                           listColorCode.length>0 &&  listColorCode.map((colorCode,index)=>{
                                let name = colorCode.slice(1);
                                return (
                                   
                                    <Col span={12} key={index} style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"0 3px",height:"2spx"}}>
                                        <div className="checkbox">
                                            <div className={`box`} style={{ backgroundColor:`${colorCode}`}} onClick={()=>{setColorHandler(name)}}>                  
                                                <img src={checkbox} className={`box-icon checkbox-${name}`}></img>
                                            </div>
                                            
                                            
                                        </div>
                                        <div style={{fontSize:10}}>{listColorName[index]}</div>

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
                    {listSize.length > 0 && listSize.map((size,index)=>{
                        return (
                            <Col span={12} key={index} style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"0 3px"}}>
                                <div className="checkbox">
                                        <div className="box size-box" onClick={()=>setSizeHandler(size)}>                  
                                                <img src={checkbox} className={`box-icon ${size}`}></img>
                                        </div>
                                            
                                            
                                </div>
                                <div style={{fontSize:10}}>{size}</div>
                            </Col>
                        )
                    })}                
                </Row>
            </div>
        </Col>
    )
}