import {Button, Col, Layout, Menu, Row,Input} from "antd";
import { HeaderPage } from "../header";
import service1 from "../../../img/service-1.png";
import service2 from "../../../img/service-2.png";
import service3 from "../../../img/service-3.png";
import service4 from "../../../img/service-4.png";
import phone from "../../../img/fa-phone.png";
import message from "../../../img/message.png";


import { ArrowRightOutlined,PhoneOutlined,DingtalkOutlined } from '@ant-design/icons';
import "./styles.css"
const {Content,Footer} = Layout;
const { Search } = Input;


export const CommomLayout = ({children}) =>{


    return (
        <div className="fullScreen">
            <HeaderPage>
                
            </HeaderPage>
            <Content className="main-page">
               
                    {children}
       
            </Content>
            <Footer>
                <div style={{backgroundColor:"#f0f2f5",paddingTop:"30px"}}>
                    <Row gutter={[15]}>
                        <Col span={6} style={{display:'flex' ,flexDirection:'column', justifyContent:"center",alignItems:"center"}}>
                            <div className="service-image">
                                <img src={service1} width={30} height={30}></img>
                            </div>
                            <h3>MIỄN PHÍ GIAO HÀNG</h3>
                            <p className="service-description">Với hoá đơn từ 700.000đ</p>
                        </Col>
                        <Col span={6}  style={{display:'flex' ,flexDirection:'column', justifyContent:"center",alignItems:"center"}}>
                            <div  className="service-image">
                                <img src={service2} width={30} height={30}></img>
                            </div>
                            <h3>3 NGÀY QUY ĐỔI SẢN PHẨM</h3>
                            <p  className="service-description">Đổi sản phẩm trong vòng 3 ngày</p>

                        </Col>
                        <Col span={6}  style={{display:'flex' ,flexDirection:'column', justifyContent:"center",alignItems:"center"}}>
                                <div  className="service-image">
                                    <img src={service3} width={30} height={30}></img>
                                </div>
                            <h3>MUA HÀNG (9H00-22H00, T2-CN)</h3>
                            <p  className="service-description" >Mua hàng - CSKH 0983985989</p>

                        </Col>
                        <Col span={6}  style={{display:'flex' ,flexDirection:'column', justifyContent:"center",alignItems:"center"}}>
                            <div  className="service-image">
                                <img src={service3} width={30} height={30}></img>
                            </div>
                            <h3>HỆ THỐNG SHOWROOOM</h3>
                            <p  className="service-description">ĐỊA CHỈ: SỐ 81 NGÕ 9 HOÀNG CẦU</p>
                        </Col>
                    </Row>
                </div>
                <div className="footer-info">
                    <Row gutter={[15]}>
                        <Col span={6}>
                            <h2>VỀ CHÚNG TÔI</h2>
                            <p>Jack Lane -</p>
                            <p>House Of Design</p>
                        </Col>
                        <Col span={6}>
                            <h2>HỖ TRỢ MUA HÀNG</h2>
                            <Menu style={{borderRight:"none"}}>
                                <Menu.Item className="support-item" icon={<ArrowRightOutlined style={{fontSize:10}} />}>Size Guide</Menu.Item>
                                <Menu.Item className="support-item" icon={<ArrowRightOutlined style={{fontSize:10}} />}>Chính sách khách hàng</Menu.Item>
                                <Menu.Item className="support-item" icon={<ArrowRightOutlined style={{fontSize:10}} />}>Chính sách bảo hành</Menu.Item>
                                <Menu.Item className="support-item" icon={<ArrowRightOutlined style={{fontSize:10}} />}>Chính sách đổi sản phẩm</Menu.Item>
                                <Menu.Item className="support-item"icon={<ArrowRightOutlined style={{fontSize:10}} />}>Giao hàng- thanh toán</Menu.Item>
                                <Menu.Item className="support-item" icon={<ArrowRightOutlined style={{fontSize:10}} />}>Bảo mật thông tin</Menu.Item>
                                <Menu.Item className="support-item" icon={<ArrowRightOutlined style={{fontSize:10}} />}>Tuyển dụng</Menu.Item>
                            </Menu>
                        </Col>
                        <Col span={6}>
                             <h2>THÔNG TIN LIÊN HỆ</h2>
                            <Menu style={{borderRight:"none"}}>
                                <Menu.Item className="support-item" icon={<PhoneOutlined />}>
                                    CSKH <span style={{color:"red"}}>0983985989</span>
                                </Menu.Item>
                                <Menu.Item className="support-item" icon={<PhoneOutlined />}>
                                    Mua hàng - CSKH 0983985989
                                </Menu.Item>
                                <Menu.Item className="support-item" icon={<PhoneOutlined />}>
                                    Mua hàng - CSKH 0983985989
                                </Menu.Item>
                            </Menu>
                            <button className="btn-info">Hệ thống cửa hàng</button>
                            <b>ĐĂNG KÍ NHẬN THÔNG TIN ƯU ĐÃI VÀ XU HƯỚNG MỚI NHẤT</b>
                            <Input.Group loading={false} compact style={{marginTop:10}}>
                                <Input   placeholder="input search text"  style={{ width: 'calc(100% - 100px)' }} />
                                <Button type="primary" style={{backgroundColor:"black",color:"#ffff"}} >Submit</Button>
                            </Input.Group>
                          {/* //  <Search placeholder="input search text" enterButton="Search" size="large" /> */}

                        </Col>
                        <Col span={6}>
                            <h2>FANPAGE</h2>
                           
                        </Col>
                    </Row>
                </div>
                <div className="footer-admin">
                    <span>Thiết kế web bởi <DingtalkOutlined /> <a href="https://www.facebook.com/hpu.nguyen/">phuVjpProzz</a></span>
                </div>
            </Footer>
            <div className="icon-phone">
                <img src={phone}></img>
            </div>
            <div className="icon-message">
                <img src={message}></img>
            </div>
        </div>
    )
}