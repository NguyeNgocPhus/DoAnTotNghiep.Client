import { Row, Col, Divider, Typography, Input, Select, Button, Spin } from "antd";
import { CloseCircleOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons';
import "./styles.css";
import { FileUploadIcon } from "../../nodes/icons/file_upload_icon";
import { useGetListImportTemplate } from "../../../../../store/import-template/use-get-list-import-template";
import { useEffect, useState } from "react";
import { REQUEST_STATE } from "../../../../../app-config/constants";
import { NodeInfo } from "./common/node_info";
import { useGetNodeDefinition } from "../../../../../store/workflow/use-get-node-definition";
import { useParams } from 'react-router-dom';
export const FileUploadDetail = ({ onUpdateNodes, data, onClose }) => {
    const [listImportTemplate, setListImportTemplate] = useState([]);
    const [listImportTemplateApiData, requestListImportTemplateApiData] = useGetListImportTemplate();
    const [nodeDefinitionApiData, requestGetNodeTemplateApiData] = useGetNodeDefinition();
    const [importTemplateId, setImportTemplateId] = useState(null);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        requestListImportTemplateApiData();

        requestGetNodeTemplateApiData({
            id: id,
            type: data.type
        });
    }, []);

    useEffect(() => {
        if (listImportTemplateApiData !== null) {
            if (listImportTemplateApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false)
                setListImportTemplate(listImportTemplateApiData.data);
            } else if (listImportTemplateApiData.state === REQUEST_STATE.ERROR) {

            } else if (listImportTemplateApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true)
            }
        }
    }, [listImportTemplateApiData])
    useEffect(() => {
        if (nodeDefinitionApiData !== null) {
            if (nodeDefinitionApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false)
                var jsonData = JSON.parse(nodeDefinitionApiData?.data?.data)

                setImportTemplateId(jsonData?.importTemplateId)
                setDescription(nodeDefinitionApiData?.data?.description)
            } else if (nodeDefinitionApiData.state === REQUEST_STATE.ERROR) {

            } else if (nodeDefinitionApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true)
            }
        }
    }, [nodeDefinitionApiData])

    const onChange = (value) => {
        setImportTemplateId(value);
    }
    const saveConfigNode = () => {

        const data1 = {
            importTemplateId: importTemplateId,
        };
        console.log("data?.data?.description", description)
        onUpdateNodes({
            nodeId: data.id,
            customData: JSON.stringify(data1),
            description: description
        })
    }
    return (
        <>
            <Row>
                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='node-detail-info'>
                        <NodeInfo setDescription={setDescription} icon={<FileUploadIcon></FileUploadIcon>} name={data?.data?.name} description={description}></NodeInfo>
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
                    <Spin size="large" spinning={loading}>


                        <div style={{ display: 'flex', justifyContent: 'start', gap: '10px', alignItems: 'center', margin: '10px 0' }}>
                            <SettingOutlined />
                            <Typography.Title style={{ margin: 0 }} level={5}>Thiết lập trigger</Typography.Title>
                        </div>

                        <div>
                            <Typography.Text level={5}>Chọn mẫu nhập liệu</Typography.Text>
                            <Select style={{ width: '100%' }} value={importTemplateId} onChange={onChange}>
                                {listImportTemplate.length > 0 && listImportTemplate.map(x => {
                                    return (
                                        <Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>
                                    )
                                })}

                            </Select>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button type="primary" style={{ margin: '10px 0' }} onClick={saveConfigNode}>Save</Button>
                        </div>
                    </Spin>
                </Col>

            </Row>
        </>
    );
}