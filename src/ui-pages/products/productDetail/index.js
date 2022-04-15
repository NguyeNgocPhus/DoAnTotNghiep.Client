import { CommomLayout } from "../../common/layout"
import {useState} from "react";
import img1 from "../../../img/ao/ao-khoac/z3011401306096_d0bcee83a2dbd232dc7f83e3494cadce.jpg";
import img2 from "../../../img/ao/ao-khoac/32bf091980284a761339.jpg";
import img3 from "../../../img/ao/ao-khoac/6.jpg";
import img4 from "../../../img/ao/ao-khoac/z3036438141005_0b4a175dca1514a098459d965c5fdd1e.jpg";
import img5 from "../../../img/ao/ao-khoac/5.jpg";
import size from "../../../img/size.jpg";
import {PlusOutlined,MinusOutlined} from "@ant-design/icons";
import "./styles.css";
import { InputNumber, Row, Tooltip } from "antd";
import { useLocation } from "react-router-dom";
import {useEffect} from "react";
import { LoadingPage } from "../../../ui-source/loading";
import underline from "../../../img/underline-ic.png";
import { useRecoilValue } from "recoil";
import { productState } from "../../../store/product/share-state";
import { REQUEST_STATE } from "../../../app-config/constants";


export const ProductDetail = () =>{

    const listProduct =  useRecoilValue(productState);
    
    const [visibleProduct,setVisibleProduct] = useState(true);
    const [listColor,setListColor] = useState([]);
    const [listImage,setListImage] = useState([]);
    const [listSize,setListSize] = useState([]);
    const [loading,setLoading ] = useState(true);
    const [listSanPhamLienQuan, setListSanPhamLienQuan] = useState([]);
    

    const [dataProduct,setDataProduct ] = useState('');
    
    const location = useLocation();
    useEffect(()=>{
        setListImage(location.state.listImage);
        setListColor(location.state.listColor);
        setDataProduct(location.state.product);
        setListSize(location.state.listSize);
        setLoading(false);
    },[])

    useEffect(()=>{
        if(listProduct.state === REQUEST_STATE.SUCCESS && dataProduct){
            const a = listProduct.data.data.products.filter(p=>{
                // console.log(p);
                return p.id !== dataProduct.id
            })
            setListSanPhamLienQuan(a);
        }
    },[listProduct])
    console.log(listProduct);
    // console.log(listSize);



    return (
        <CommomLayout>
            {loading ? 
                <LoadingPage loading={loading}></LoadingPage> : 
                <>
                <div style={{marginTop:50,backgroundColor:"#f0f2f5",height:"35px", display: "flex",alignItems: "center"}}>
                    <div className="title-page">Trang chủ / Áo</div>    
                </div>
                <div className={'page-product-detail'}>
                    <div style={{width:"30%" ,position: "sticky",top:"80px"}}>
                        <div style={{height:"10px",fontWeight:700,margin:"20px 0",display:"flex",alignItems:"center",gap:"0 5px"}}>SẢN PHẨM 
                            {!visibleProduct && <PlusOutlined style={{fontSize:10}} onClick={()=>setVisibleProduct(true)}/>}
                            {visibleProduct && <MinusOutlined style={{fontSize:10}} onClick={()=>setVisibleProduct(false)}/>}
                        </div>  
                        <ul className="list-field-product" style={{display:`${visibleProduct ? "block":"none"}`}} >
                            <li className="field-item">ÁO TANKTOP</li>
                            <li className="field-item">ÁO NỈ</li>
                            <li className="field-item">ÁO PHÔNG ODIN</li>
                            <li className="field-item">ÁO KHOÁC</li>
                            <li className="field-item">ÁO POLO</li>
                            <li className="field-item">ÁO SƠMI</li>

                        </ul>
                    </div> 
                    <div >
                        <div style={{display:"flex",alignItems:"flex-start",gap:"0 30px"}}>
                        <div className={"list-image"}>
                            <div className={"list-image-left"}>
                                {listImage.length >0  && listImage.map((img)=>{
                                    return (
                                        <div className={"image-ao_left"}>
                                            <img src={img1}></img>
                                        </div>  
                                    )
                                })}
                            
                            </div>
                            <div className={"list-image-right"}>
                                {listImage.length > 0 && listImage.map((img)=>{
                                    return (
                                        <div className={"image-ao_right"}>
                                            <img src={img1}></img>
                                        </div>
                                    )
                                })}
                            </div>

                        </div> 
                        <div style={{flex:1,position: "sticky",top:"80px"}}>
                            <h3>ÁO KHOÁC LÓT LÔNG FUR JACKET</h3>
                            <div>Mã sản phẩm: <b>ABC-123</b></div>
                            <div className="modal-price">
                                    <div className="price">199,000</div>
                                    <div style={{fontWeight: 700}}>đ</div>
                            </div>
                            <div className="product-color">
                                    <Tooltip title="Đen"><div className="product-img-color">
                                        <img src={img1} className="image"></img>
                                    </div></Tooltip>
                                    
                                    <Tooltip title="Trắng"><div className="product-img-color">
                                        <img src={img1} className="image"></img>
                                    </div></Tooltip>
                                    <Tooltip title="Đỏ"><div className="product-img-color">
                                        <img src={img1} className="image"></img>
                                    </div></Tooltip>
                            </div>
                            <div className="product-size">
                                    <div>Kích thước</div>
                                    <div className="list-product-size">
                                        {listSize.length> 0 && listSize.map((size)=>{
                                            return   <div className="size">{size}</div>
                                        })}
                                    </div>
                                    <div>Hướng dẫn chọn size</div>
                                
                            </div>
                            <InputNumber defaultValue={1} width={70} height={50}></InputNumber>
                            <button className={"btn-product-top"}>Chọn mua</button>
                            <button  className={"btn-product-bottom"} >Thử tại showroom</button>
                            <div><b>Chi tiết sản phẩm</b></div>
                            <img src={size}></img>

                            </div>
                        </div>
                        <div className={"product-footer"}>
                            <div className={"product-footer__title"}>SẢN PHẨM LIÊN QUAN</div>   
                            <div><img src={underline}></img></div>   
                            <Row>
                                        
                            </Row>     
                        </div>
                        
                       
                    </div>  

                </div>   
             </>
            
            
            }
            
            
        </CommomLayout>
    )



}