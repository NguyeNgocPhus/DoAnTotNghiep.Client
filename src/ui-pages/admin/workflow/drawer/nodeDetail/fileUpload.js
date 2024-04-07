import { Row, Col, Divider, Typography, Input, Select, Button } from "antd";
import { CloseCircleOutlined, SettingOutlined , EditOutlined } from '@ant-design/icons';
import "./styles.css";
import { FileUploadIcon } from "../../nodes/icons/file_upload_icon";
import { useGetListImportTemplate } from "../../../../../store/import-template/use-get-list-import-template";
import { useEffect, useState } from "react";
import { REQUEST_STATE } from "../../../../../app-config/constants";
import { NodeInfo } from "./common/node_info";
export const FileUploadDetail = ({ data, onClose }) => {
    const [listImportTemplate, setListImportTemplate] = useState([]);
    const [listImportTemplateApiData , requestListImportTemplateApiData] = useGetListImportTemplate();
    useEffect(()=>{
        requestListImportTemplateApiData();
    },[]);

    useEffect(()=>{
        if (listImportTemplateApiData !== null) {
            if (listImportTemplateApiData.state === REQUEST_STATE.SUCCESS) {
                
                setListImportTemplate(listImportTemplateApiData.data);
            } else if (listImportTemplateApiData.state === REQUEST_STATE.ERROR) {

            } else if (listImportTemplateApiData.state === REQUEST_STATE.REQUEST) {
                
            }
        }
    },[listImportTemplateApiData])

    return (
        <>
            <Row>
                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='node-detail-info'>
                        <NodeInfo icon={<FileUploadIcon></FileUploadIcon>} name={data?.data?.name} description={data?.data?.description}></NodeInfo>
                        {/* <div className='node-image'>
                            
                        </div>
                        <div className='node-name'>
                    
                            <Typography.Text strong>{data?.data?.name}</Typography.Text>
                            <div> 
                                <Typography.Text>{data?.data?.description}</Typography.Text> 
                                <EditOutlined />
                            </div>
                        </div> */}

                        {/* <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
                    </div>
                    <CloseCircleOutlined onClick={onClose} ></CloseCircleOutlined>
                </Col>
                <Divider />
                <Col span={24}>
                    {/* <div>TYpe : {data?.type}</div>
                    <div>Id : {data?.id}</div> */}
                    <div style={{ display: 'flex', justifyContent: 'start', gap:'10px', alignItems:'center' , margin:'10px 0'}}>
                        <SettingOutlined />
                        <Typography.Title style={{margin:0}} level={5}>Thiết lập trigger</Typography.Title>
                    </div>

                    <div>
                        <Typography.Text level={5}>Chọn mẫu nhập liệu</Typography.Text>
                        <Select style={{ width: '100%' }}>
                            {listImportTemplate.length>0 && listImportTemplate.map(x=>{
                                return (
                                    <Select.Option value={x.id}>{x.name}</Select.Option>
                                )
                            })}
                        
                        </Select>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'end'}}>
                        <Button type="primary" style={{margin:'10px 0'}}>Save</Button>  
                    </div>
                    
                </Col>

            </Row>
        </>
    );
}