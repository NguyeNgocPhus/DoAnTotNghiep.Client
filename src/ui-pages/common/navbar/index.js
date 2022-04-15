
import { useEffect, useState } from "react";
import { Menu } from "antd"
import "./styles.css"

import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4','sub3','sub5','sub6'];



export const NavBar = ({slug,data,img,type}) =>{

    const navigate = useNavigate();
    
    return (
        <div className="menu-ao">
                <div className="navbar-ao">
                    {type==='ao' && <>
                        <ul className="ul-ao">
                            {data && data.map((type,index)=>{
                                return <li onClick={()=>navigate(`/${slug[index]}`,{
                                    state:slug[index]
                                })}>{type.toUpperCase() }</li>
                            })}

                        </ul>
                        {img && <div className="ao-image">
                            <img src={img} ></img>
                        </div>} </>
                    }

                    
                    {type==='quan' && <><ul className="ul-ao">
                        {data && data.map((type,index)=>{
                            return <li onClick={()=>navigate(`/${slug[index]}}`,{
                                state:slug[index]
                            })}>{type.toUpperCase()}</li>
                        })}
                    </ul>
                    {img && <div className="ao-image">
                        <img src={img} ></img>
                    </div>}</>}
                    {type==='phukien' && <>
                    <ul className="ul-ao">
                        {data && data.map((type,index)=>{
                            return <li onClick={()=>navigate(`/${slug[index]}`,{
                                    state:slug[index]
                             })}>{type.toUpperCase()}</li>
                        })}
                    </ul>
                    
                    </>}
                      
                    
            </div>
           
            
        </div>
    )
}