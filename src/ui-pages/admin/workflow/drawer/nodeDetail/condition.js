import { Row, Col, Divider, Typography } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import "./styles.css";
import { ConditionIcon } from "../../nodes/icons/condition_icon";
export const ConditionDetail = ({data,onClose}) => {
    
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
                    <div>TYpe : {data?.type}</div>
                    <div>Id : {data?.id}</div>
                </Col>

            </Row>
        </>
    );
}