import { Col, Row } from "antd";

import "./styles.css";
import { Node } from "../node";
export const ListNodeAction = ({ nodes }) => {

    return (
        <>
            <Row className="dndflow">
                <Col span={24}>Danh sách hoạt động</Col>
                {nodes.length && nodes.map((node, index) => {
                    return (
                        <Col span={24} key={node.key}>
                            <Node node={node}></Node>
                        </Col>
                    )
                })}
            </Row>
        </>
    );
}