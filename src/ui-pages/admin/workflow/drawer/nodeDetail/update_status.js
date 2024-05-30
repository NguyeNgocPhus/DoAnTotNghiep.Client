import { Row, Col, Divider, Typography, Input, Select, Button, Spin } from "antd";
import { CloseCircleOutlined, SettingOutlined, FormOutlined } from '@ant-design/icons';
import "./styles.css";
import { FileUploadIcon } from "../../nodes/icons/file_upload_icon";
import { useGetListImportTemplate } from "../../../../../store/import-template/use-get-list-import-template";
import { useEffect, useState } from "react";
import { REQUEST_STATE } from "../../../../../app-config/constants";
import { NodeInfo } from "./common/node_info";
import { useGetNodeDefinition } from "../../../../../store/workflow/use-get-node-definition";
import { useParams } from 'react-router-dom';
import { UpdateStatusIcon } from "../../nodes/icons/update_status";

// const objectList = [
//     { label: "Dữ liệu báo cáo", key: "ImportHistory" },
//     { label: "Người dùng", key: "User" },
// ]
const statusList = [
    { label: "Phê duyệt", key: "Approve", object: "ImportHistory" },
    { label: "Từ chối", key: "Reject", object: "ImportHistory" },
    { label: "Hoạt động", key: "Active", object: "User" },
    { label: "Xoá", key: "Delete", object: "User" },
]

export const UpdateStatusDetail = ({ onUpdateNodes, data, onClose }) => {

    const [nodeDefinitionApiData, requestGetNodeTemplateApiData] = useGetNodeDefinition();
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [objectList, setObjectList] = useState([
        { label: "Dữ liệu báo cáo", key: "ImportHistory" },
        { label: "Người dùng", key: "User" }
    ]);
    useEffect(() => {
       
        requestGetNodeTemplateApiData({
            id: id,
            activityId: data.id,
            type: data.type
        });
    }, []);
   
    const [object, setObject] = useState(null);
    const [status, setStatus] = useState(null);


    useEffect(() => {
        if (nodeDefinitionApiData !== null) {
            if (nodeDefinitionApiData.state === REQUEST_STATE.SUCCESS) {

                var jsonData = JSON.parse(nodeDefinitionApiData?.data?.data)
                console.log("jsonData",jsonData)
                setObject(jsonData["object"]);
                setStatus(jsonData["status"]);
                setLoading(false);
            } else if (nodeDefinitionApiData.state === REQUEST_STATE.ERROR) {

            } else if (nodeDefinitionApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [nodeDefinitionApiData])
    const onChangeObject = (value) => {
        setObject(value);
        setStatus(null);
    }
    const onChangeStatus = (value) => {
        setStatus(value);
    }
    const saveConfigNode = () => {

        const data1 = {
            object,
            status
        };
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
                        <NodeInfo setDescription={setDescription} icon={<UpdateStatusIcon></UpdateStatusIcon>} name={data?.data?.name} description={description}></NodeInfo>
                    </div>
                    <CloseCircleOutlined onClick={onClose} ></CloseCircleOutlined>
                </Col>
                <Divider />
                <Col span={24}>
                    <Spin size="small" spinning={loading}>


                        <div style={{ display: 'flex', justifyContent: 'start', gap: '10px', alignItems: 'center', margin: '10px 0' }}>
                            <SettingOutlined />
                            <Typography.Title style={{ margin: 0 }} level={5}>Thiết lập hành động</Typography.Title>
                        </div>

                        <div>
                            <Typography.Text level={5}>Chọn chọn đối tượng cập nhật</Typography.Text>
                            <Select style={{ width: '100%' }} value={object} onChange={onChangeObject}>
                                {objectList.length > 0 && objectList.map(x => {
                                    return (
                                        <Select.Option key={x.key} value={x.key}>{x.label}</Select.Option>
                                    )
                                })}
                            </Select>
                            <Typography.Text level={5}>Trạng thái</Typography.Text>
                            <Select style={{ width: '100%' }} value={status} onChange={onChangeStatus}>
                                {object && statusList.filter(x => x.object === object).map(x => {
                                    return (
                                        <Select.Option key={x.key} value={x.key}>{x.label}</Select.Option>
                                    )
                                })}
                            </Select>

                        </div>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button type="primary" style={{ margin: '10px 0' }} onClick={saveConfigNode}>Lưu</Button>
                        </div>
                    </Spin>
                </Col>

            </Row>
        </>
    );
}