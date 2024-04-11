import { Row, Col, Divider, Typography, Select, Button } from "antd";
import { CloseCircleOutlined, SettingOutlined } from '@ant-design/icons';
import "./styles.css";
import { ApproveIcon } from "../../nodes/icons/approve_icon";
import { REQUEST_STATE } from "../../../../../app-config/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetNodeDefinition } from "../../../../../store/workflow/use-get-node-definition";
import { useGetRoles } from "../../../../../store/auth/use-get-roles";
import { NodeInfo } from "./common/node_info";
import { RejectIcon } from "../../nodes/icons/reject_icon";
export const RejectDetail = ({ onUpdateNodes, data, onClose }) => {
    const [listRole, setListRole] = useState([]);
    const [roleId, setRoleId] = useState(null);

    const [rolesApiData, requestGetRolesApiData] = useGetRoles();
    const [nodeDefinitionApiData, requestGetNodeTemplateApiData] = useGetNodeDefinition();

    const [description, setDescription] = useState("");
    const { id } = useParams();

    useEffect(() => {
        requestGetRolesApiData();

        requestGetNodeTemplateApiData({
            id: id,
            type: data.type
        });
    }, []);

    useEffect(() => {
        if (rolesApiData !== null) {
            if (rolesApiData.state === REQUEST_STATE.SUCCESS) {

                setListRole(rolesApiData.data);
            } else if (rolesApiData.state === REQUEST_STATE.ERROR) {

            } else if (rolesApiData.state === REQUEST_STATE.REQUEST) {

            }
        }
    }, [rolesApiData])
    useEffect(() => {
        if (nodeDefinitionApiData !== null) {
            if (nodeDefinitionApiData.state === REQUEST_STATE.SUCCESS) {

                var jsonData = JSON.parse(nodeDefinitionApiData?.data?.data)

                setRoleId(jsonData?.roleId)
                setDescription(nodeDefinitionApiData?.data?.description)
            } else if (nodeDefinitionApiData.state === REQUEST_STATE.ERROR) {

            } else if (nodeDefinitionApiData.state === REQUEST_STATE.REQUEST) {

            }
        }
    }, [nodeDefinitionApiData])

    const onChange = (value) => {
        setRoleId(value);
    }
    const saveConfigNode = () => {

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
                        <NodeInfo setDescription={setDescription} icon={<RejectIcon></RejectIcon>} name={data?.data?.name} description={description}></NodeInfo>
                        {/* <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
                    </div>
                    <CloseCircleOutlined onClick={onClose} ></CloseCircleOutlined>
                </Col>
                <Divider />
                <Col span={24}>
                    {/* <div>TYpe : {data?.type}</div>
                    <div>Id : {data?.id}</div> */}
                    <div style={{ display: 'flex', justifyContent: 'start', gap: '10px', alignItems: 'center', margin: '10px 0' }}>
                        <SettingOutlined />
                        <Typography.Title style={{ margin: 0 }} level={5}>Thiết lập action</Typography.Title>
                    </div>

                    <div>
                        <Typography.Text level={5}>Chọn quyền từ chối</Typography.Text>
                        <Select style={{ width: '100%' }} value={roleId} onChange={onChange}>
                            {listRole.length > 0 && listRole.map(x => {
                                return (
                                    <Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>
                                )
                            })}

                        </Select>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button type="primary" style={{ margin: '10px 0' }} onClick={saveConfigNode}>Save</Button>
                    </div>

                </Col>

            </Row>
        </>
    );
}