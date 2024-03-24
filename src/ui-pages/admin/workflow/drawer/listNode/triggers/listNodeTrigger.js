import { Col, Drawer, Row, Tabs } from "antd";

import "./styles.css";
import { Node } from "../node";
export const ListNodeTrigger = ({nodes}) => {

    
    return (
        <>

            <Row className="dndflow">
                <Col span={24}>Danh sách Triggers</Col>
                {nodes.length && nodes.map((node, index) => {
                    return (
                        <Col span={24} key={node.key}>
                            <aside>
                                <Node node={node}></Node>
                            </aside>
                        </Col>
                    )
                })}
            </Row>

        </>
    );
}