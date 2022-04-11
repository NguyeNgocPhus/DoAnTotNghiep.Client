import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import {useState,useEffect} from 'react';
import  tinh from "../../../data/tinh.json";
import quanhuyen from "../../../data/quanhuyen.json";
import moment from 'moment';
const {Option } = Select;
function compare( a, b ) {
    if ( a.slug < b.slug ){
      return -1;
    }
    if ( a.slug > b.slug ){
      return 1;
    }
    return 0;
  }
export const InfoProfile = () =>{
    const [qh,setQh] = useState([]);
    const [listTinh,setlistTinh] = useState([]);
    const [listQuanHuyen,setListQuanHuyen] = useState([]);
    const [valueTinh, setValueTinh]  = useState('');
    const [valueQuanHuyen,setValueQuanHuyen] = useState('');

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
      }
    useEffect(()=>{
        
        let arr = [];
        let arr1 = [];
        let arr2 = [];
        Object.entries(tinh).forEach(([key, value]) => {
            if(value.code!=='01' && value.code!=='79' ){
                arr.push(value);
            }else{
                arr1.push(value);
            }
        });
        Object.entries(quanhuyen).forEach(([key, value]) => {
            arr2.push(value);
        });
        arr1.reverse()
        // console.log(arr1);
        arr.sort(compare);

        const listTinh =  arr1.concat(arr);
        setlistTinh(listTinh)
        setQh(arr2);
    },[])

    const onChangeTinh = (val) =>{
        if(val !== ''){
            setValueQuanHuyen('');
            setValueTinh(val);
            const listQh = qh.filter(qh=>{
                return qh.parent_code === val;
            })
            setListQuanHuyen(listQh);

            
        }else{
            setValueTinh(val);
            setValueQuanHuyen(val)
        }
        
    } 
    const onChangeQh = (val) =>{
        setValueQuanHuyen(val)
    }
    return (
        <div>
             <div className="title-info">THÔNG TIN CÁ NHÂN</div>
             <Form>
                 <Row gutter={[15]}>
                     <Col span={12}>
                        <Form.Item label="Tên đăng nhập" labelCol={{ span: 24 }}>
                            <Input placeholder="Tên đăng nhập"></Input>
                        </Form.Item>
                     </Col>
                     <Col  span={12}>
                        <Form.Item label="Email" labelCol={{ span: 24 }}>
                            <Input placeholder="Email"></Input>
                        </Form.Item>
                     </Col>
                     <Col  span={12}>
                        <Form.Item label="Số điện thoại" labelCol={{ span: 24 }}>
                            <Input placeholder="Số điện thoại"></Input>
                        </Form.Item>
                     </Col>
                     <Col  span={12}>
                        <Form.Item label="Ngày sinh" labelCol={{ span: 24 }}  hasFeedback >
                            <DatePicker  style={{
                                    width: '100%',
                                    }}
                                    format={"DD/MM/YYYY"}
                                    disabledDate={disabledDate}
                            ></DatePicker>
                        </Form.Item>
                     </Col>
                     <Col  span={12}> 
                        <Form.Item label="Thành phố" labelCol={{ span: 24 }}>
                            <Select  value={valueTinh} onChange={onChangeTinh} showArrow
                            allowClear showSearch filterOption={(input, option) => {
                                if(option.title) {
                                    return option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            }}>
                                {listTinh && listTinh.map((tinh,index)=>{
                                    return <Option key={index} value={tinh.code} title={tinh.name}>{tinh.name}</Option>
                                })}
                            
                            </Select>
                        </Form.Item>
                     </Col>
                     <Col  span={12}>
                        <Form.Item label="Quận huyện" labelCol={{ span: 24 }}>
                            <Select value={valueQuanHuyen} onChange={onChangeQh} showArrow
                            allowClear showSearch filterOption={(input, option) => {
                                if(option.title) {
                                    return option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            }}>
                                {listQuanHuyen&&listQuanHuyen.map((qh,index)=>{
                                    return <Option key={index} value={qh.code} title={qh.name_with_type}>{qh.name_with_type}</Option>

                                })}
                            </Select>
                        </Form.Item>
                     </Col>
                     <Col  span={12}>
                        <Form.Item label="Địa chỉ" labelCol={{ span: 24 }}>
                            <Input placeholder="địa chỉ"></Input>
                        </Form.Item>
                     </Col>
                 </Row>
                 
                 
             </Form>
             <button className="btn-info1">CẬP NHẬT THÔNG TIN CÁ NHÂN</button>

        </div>
    )
}