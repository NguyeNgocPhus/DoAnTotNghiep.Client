import { Row, Col, Divider, Typography, Select, Button, Spin } from "antd";
import { CloseCircleOutlined, SettingOutlined } from '@ant-design/icons';
import "./styles.css";
import { useEffect, useState } from "react";
import { ConditionIcon } from "../../nodes/icons/condition_icon";
import { Field, QueryBuilder, defaultOperators } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';
import { useGetRoles } from "../../../../../store/auth/use-get-roles";
import { useGetNodeDefinition } from "../../../../../store/workflow/use-get-node-definition";
import { useParams } from "react-router-dom";
import { REQUEST_STATE } from "../../../../../app-config/constants";

const operators = defaultOperators.filter((op) => op.name === '=' || op.name === '!=');
const fields = [
    {
        name: 'Roles', 
        operators: operators, 
        label: 'Quyền người nhập',
        valueEditorType: 'select',
        values: [
        
        ]
    }
];

export const ConditionDetail = ({ onUpdateNodes, data, onClose }) => {
    const [rolesApiData, requestGetRolesApiData] = useGetRoles();
    const [nodeDefinitionApiData, requestGetNodeTemplateApiData] = useGetNodeDefinition();
    const [loading, setLoading] = useState(false);
    const [initializeField, setInitializeFields] = useState(fields);


    const { id } = useParams();
    useEffect(() => {
        requestGetRolesApiData();
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
                // console.log("rolesApiData",rolesApiData)
                var roles = rolesApiData.data.map(x => {
                    return {
                        name: x.roleCode,
                        label: x.name,
                    }

                })
                var data = initializeField.map(x=>{
                    if(x.name === "Roles"){
                        x.values = roles;
                        return x;
                    }
                    return x;
                })
                console.log(data);
                setInitializeFields([...data])
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
                setQuery(jsonData);
                setLoading(false);
               
            } else if (nodeDefinitionApiData.state === REQUEST_STATE.ERROR) {

            } else if (nodeDefinitionApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [nodeDefinitionApiData])



    const [query, setQuery] = useState({
        combinator: 'and',
        rules: [

        ],
    });
    const onChange = (value) => {

        setQuery(value);
    }
    const saveConfigNode = () => {

        onUpdateNodes({
            nodeId: data.id,
            customData: JSON.stringify(query),
        });
    }
    return (
        <>
            <Row>
                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='node-info'>
                        <div className='node-image'>
                            <ConditionIcon></ConditionIcon>
                        </div>
                        <div className='node-name'>
                            <div htmlFor="text">{data?.type}</div>
                            <Typography.Text>{data?.data?.name}</Typography.Text>
                        </div>

                    </div>
                    <CloseCircleOutlined onClick={onClose} ></CloseCircleOutlined>
                </Col>
                <Divider />
                <Col span={24}>
                    <Spin size="small" spinning={loading}>
                        <div style={{ display: 'flex', justifyContent: 'start', gap: '10px', alignItems: 'center', margin: '10px 0' }}>
                            <SettingOutlined />
                            <Typography.Title style={{ margin: 0 }} level={5}>Thiết lập bộ lọc</Typography.Title>
                        </div>

                        <div>
                            <QueryBuilder controlClassnames={{ queryBuilder: 'queryBuilder-branches' }} fields={initializeField} query={query} onQueryChange={onChange} />
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