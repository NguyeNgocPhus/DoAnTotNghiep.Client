import { Image, Layout, Row, Col, Menu, Drawer,Input } from 'antd';
import  logo from "../../../img/logo/logo.jpg";
import iconUser from "../../../img/logo/icon-header-1.png";
import iconStore from "../../../img/logo/icon-header-2.png";
import iconSearch from "../../../img/logo/icon-header-3.png";
import ao from "../../../img/ao.jpg";
import quan from "../../../img/quan.jpg";
import {SearchOutlined  } from "@ant-design/icons";

import "./styles.css";
import { NavBar } from '../navbar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { myProfileState, userInfoState } from '../../../store/auth/share-state';
import { REQUEST_STATE } from '../../../app-config/constants';
import { typeProductState } from '../../../store/type-product/share-state';
import { Cart } from '../../cart';
const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;

export const HeaderPage = () =>{
    const listTypeProduct = useRecoilValue(typeProductState);
    const myProfile = useRecoilValue(myProfileState);
    const [listTypeAo,setListTypeAo] = useState([]);
    const [listTypeQuan,setListTypeQuan] = useState([]);
    const [listTypePhuKien,setListTypePhuKien] = useState([]);
    const [listTypeAoSlug,setListTypeAoSlug] = useState([]);
    const [listTypeQuanSlug,setListTypeQuanSlug] = useState([]);
    const [listTypePhuKienSlug,setListTypePhuKienSlug] = useState([]);
    const [visibleSearch, setvisibleSearch] = useState(false);
    const [visibleStore, setvisibleStore] = useState(false);
    
    
    useEffect(()=>{
        if(listTypeProduct.state === REQUEST_STATE.SUCCESS){
            let ao = [];
            let quan = [];
            let phukien = [];
            let aoSlug = [],quanSlug = [],phukienSlug = [];
            listTypeProduct.data.forEach(data =>{
                if(data.type ==='ao'){
                    ao.push(data.name);
                    aoSlug.push(data.nameSlug);
                }
                if(data.type === 'quan'){
                    quan.push(data.name);
                    quanSlug.push(data.nameSlug);
                }
                if(data.type === 'phukien'){
                    phukien.push(data.name);
                    phukienSlug.push(data.nameSlug);
                }
            })
            setListTypeAo(ao);
            setListTypeQuan(quan);
            setListTypePhuKien(phukien);
            setListTypeAoSlug(aoSlug);
            setListTypeQuanSlug(quanSlug);
            setListTypePhuKienSlug(phukienSlug)
        }
    },[listTypeProduct])

    const navigate = useNavigate();
    
    const onSignin = () =>{
        navigate('/user/signin')
    }
    const onShowProfile = () =>{
        navigate("/profile");
    }
    const showDrawerSearch = () => {
        setvisibleSearch(true);
    };
    const showDrawerStore = () => {
        setvisibleStore(true);
    };
    const onCloseSearch = () => {
        setvisibleSearch(false);
    };
    const onCloseStore = () =>{
        setvisibleStore(false);
    }
   
    return (
            
                <div style={{position:"fixed",width:"100%",top:0,left:0,zIndex:100,backgroundColor:"#ffff"}} className="header">
                    <Row className='headerPage'>
                        <Col span={5} style={{cursor: "pointer"}} onClick={()=>{navigate("/")}}>
                            <img src={logo}   className="logo-header"></img>
                        </Col>
                        <Col span={16} className="navbar">
                            <ul mode="horizontal" className="menu">
                                <li className='menu-item ao'>
                                    <b>ÁO</b> 
                                    {listTypeAo && listTypeAo.length>0 && <NavBar slug={listTypeAoSlug} data={listTypeAo} img={ao} type={"ao"}></NavBar> }                            
                                </li >
                               
                                <li className='menu-item ao'>
                                    <b>QUẦN</b>
                                   {listTypeQuan && listTypeQuan.length>0 && <NavBar slug={listTypeQuanSlug} data={listTypeQuan} img={quan} type="quan"></NavBar>  } 
                                </li>
                                <li className='menu-item ao'>
                                    <b>SET</b>
                                </li>
                                <li className='menu-item ao'>
                                    <b>PHỤ KIỆN</b>
                                    {listTypePhuKien && listTypePhuKien.length> 0 && <NavBar slug={listTypePhuKienSlug} data={listTypePhuKien} type="phukien"></NavBar>  }
                                </li>
                                <li className='menu-item ao'>
                                    <b>KHUYẾN MÃI</b>                              
                                </li>
                                <li className='menu-item ao'>
                                    <b>KIẾN THỨC</b>
                                </li>
                            </ul>
                        </Col>
                    
                        <Col span={3} style={{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:"0 10px"}}>
                            <div> <img src={iconSearch}width={20} height={20} style={{cursor: "pointer"}} onClick={showDrawerSearch}></img>   </div>
                            <div> <img src={iconUser} width={20} height={20} style={{cursor: "pointer"}} onClick={myProfile.state === REQUEST_STATE.SUCCESS ? onShowProfile : onSignin}></img>              </div>                                          
                            <div> <img src={iconStore}  width={20} height={20} style={{cursor: "pointer"}}   onClick={showDrawerStore}></img>             </div>                           
                                    
                        </Col>
                        <Drawer  getContainer={false} zIndex={100000}  width={480} bodyStyle={{ padding: 70 }} placement="right" onClose={onCloseSearch} visible={visibleSearch}>
                            <h3>SEARCH</h3>
                        
                            <Input placeholder="Tìm kiếm sản phẩm" className='input-drawer' suffix={<SearchOutlined />}></Input>
                        </Drawer>   
                        <Cart visibleStore={visibleStore} onCloseStore={onCloseStore}></Cart>  
                       

                    </Row>
                    
                </div>
           
    )
}