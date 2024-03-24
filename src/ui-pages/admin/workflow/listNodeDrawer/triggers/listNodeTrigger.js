import { Col, Drawer, Row, Tabs } from "antd";
import { NodeTrigger } from "./nodeTrigger";
import { CloseCircleOutlined } from '@ant-design/icons';
import "./styles.css";
export const ListNodeTrigger = ({nodes}) => {

    
    return (
        <>

            <Row className="dndflow">
                <Col span={24}>Danh sách Triggers</Col>
                {nodes.length && nodes.map((node, index) => {
                    return (
                        <Col span={24} key={node.key}>
                            <aside>
                                <NodeTrigger node={node}></NodeTrigger>
                            </aside>
                        </Col>
                    )
                })}
            </Row>

        </>
    );
}