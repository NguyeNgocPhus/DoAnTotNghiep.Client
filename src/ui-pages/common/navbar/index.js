
import { useEffect, useState } from "react";
import { Menu } from "antd"
import "./styles.css"

import { DownOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4','sub3','sub5','sub6'];



export const NavBar = ({img,type}) =>{

    const [display,setDisplay] = useState(false);
    const handlerDisplay = () =>{
        setDisplay((display)=>{
            return !display
        })
    }
    
    return (
        <div className="menu-ao">
                <div className="navbar-ao">
                    {type==='ao' && <><ul className="ul-ao">
                        <li>ÁO TANKTOP</li>
                        <li>
                            <div>  ÁO NỈ <DownOutlined className="icon-down" onClick={handlerDisplay}></DownOutlined>

                                <div className="menu-down" style={{display:`${display ? "block":"none"}`, lineStyle:"none"}}>
                                    <ul className="ul-ao-down">
                                        <li>ÁO SWEATER</li>
                                        <li>ÁO HOODIE</li>
                                    </ul>
                                </div>
                            </div>
                        

                        </li>
                        <li>ÁO PHÔNG ODIN</li>
                        <li>ÁO KHOÁC</li>
                        <li>ÁO PHÔNG</li>
                        <li>ÁO POLO</li>                    
                        <li>ÁO SƠMI</li>

                    </ul>
                    {img && <div className="ao-image">
                        <img src={img} ></img>
                    </div>} </>}
                    {type==='quan' && <><ul className="ul-ao">
                        <li>QUẦN SHORT</li>
                        <li>QUẦN DÀI</li>
                       

                    </ul>
                    {img && <div className="ao-image">
                        <img src={img} ></img>
                    </div>}</>}
                    {type==='phukien' && <>
                    <ul className="ul-ao">
                        <li>PHỤ KIỆN UNISEX</li>
                        <li>BALO-TÚI-VÍ</li>
                        <li>NÓN MŨ</li>
                    </ul>
                    
                    </>}
                      
                    
            </div>
           
            
        </div>
    )
}