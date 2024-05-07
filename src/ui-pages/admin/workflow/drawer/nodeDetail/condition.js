import { Row, Col, Divider, Typography, Select, Button } from "antd";
import { CloseCircleOutlined, SettingOutlined } from '@ant-design/icons';
import "./styles.css";
import { ConditionIcon } from "../../nodes/icons/condition_icon";
import { Field, QueryBuilder, RuleGroupType } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';
import { useState } from "react";


export const ConditionDetail = ({ data, onClose }) => {
    const fields = [
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
    ];
    const [query, setQuery] = useState({
        combinator: 'and',
        rules: [
            { field: 'firstName', operator: '=', value: 'Steve' },
            { field: 'lastName', operator: '=', value: 'Vai' },
        ],
    });
    const onChange = (value) => {
    }
    const saveConfigNode = () => {

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
                        <QueryBuilder fields={fields} query={query} onQueryChange={setQuery} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button type="primary" style={{ margin: '10px 0' }} onClick={saveConfigNode}>Save</Button>
                    </div>

                </Col>

            </Row>
        </>
    );
}