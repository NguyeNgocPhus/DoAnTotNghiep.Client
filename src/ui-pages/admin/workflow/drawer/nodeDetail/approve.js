import { Row, Col, Divider, Typography, Select, Button, Spin } from "antd";
import { CloseCircleOutlined, SettingOutlined } from '@ant-design/icons';
import "./styles.css";
import { ApproveIcon } from "../../nodes/icons/approve_icon";
import { REQUEST_STATE } from "../../../../../app-config/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetNodeDefinition } from "../../../../../store/workflow/use-get-node-definition";
import { useGetRoles } from "../../../../../store/auth/use-get-roles";
import { NodeInfo } from "./common/node_info";
export const ApproveDetail = ({ onUpdateNodes, data, onClose }) => {
    const [listRole, setListRole] = useState([]);
    const [roleId, setRoleId] = useState(null);

    const [rolesApiData, requestGetRolesApiData] = useGetRoles();
    const [nodeDefinitionApiData, requestGetNodeTemplateApiData] = useGetNodeDefinition();
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const { id } = useParams();

    useEffect(() => {
        requestGetRolesApiData();
        console.log("data", data)
        requestGetNodeTemplateApiData({
            id: id,
            activityId: data.id,
            type: data.type
        });
    }, []);

    useEffect(() => {
        if (rolesApiData !== null) {
            if (rolesApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                setListRole(rolesApiData.data);
            } else if (rolesApiData.state === REQUEST_STATE.ERROR) {

            } else if (rolesApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [rolesApiData])
    useEffect(() => {
        if (nodeDefinitionApiData !== null) {
            if (nodeDefinitionApiData.state === REQUEST_STATE.SUCCESS) {

                var jsonData = JSON.parse(nodeDefinitionApiData?.data?.data)
                setLoading(false);
                setRoleId(jsonData?.roleId)
                setDescription(nodeDefinitionApiData?.data?.description)
            } else if (nodeDefinitionApiData.state === REQUEST_STATE.ERROR) {

            } else if (nodeDefinitionApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [nodeDefinitionApiData])

    const onChange = (value) => {
        setRoleId(value);
    }
    const saveConfigNode = () => {
        console.log("roleId", roleId);
        const data1 = {
            roleId: roleId,
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
                    <div className='node-info'>
                        <NodeInfo setDescription={setDescription} icon={<ApproveIcon></ApproveIcon>} name={data?.data?.name} description={description}></NodeInfo>

                        {/* <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
                    </div>
                    <CloseCircleOutlined onClick={onClose} ></CloseCircleOutlined>
                </Col>
                <Divider />
                <Col span={24}>
                    <Spin size="small" spinning={loading}>
                        <div style={{ display: 'flex', justifyContent: 'start', gap: '10px', alignItems: 'center', margin: '10px 0' }}>
                            <SettingOutlined />
                            <Typography.Title style={{ margin: 0 }} level={5}>Thiết lập action</Typography.Title>
                        </div>

                        <div>
                            <Typography.Text level={5}>Chọn quyền phê duyệt</Typography.Text>
                            <Select style={{ width: '100%' }} value={roleId} onChange={onChange}>
                                {listRole.length > 0 && listRole.map(x => {
                                    return (
                                        <Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>
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