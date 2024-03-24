import { Col, Row } from "antd";

import "./styles.css";
import { NodeAction } from "./nodeAction";
export const ListNodeAction = ({nodes}) => {

    return (
        <>
            <Row className="dndflow">
                <Col span={24}>Danh sách hoạt động</Col>
                {nodes.length && nodes.map((node , index)=>{
                           return (
                            <Col span={24} key={node.key}>
                                <NodeAction node={node}></NodeAction>
                            </Col>
                           )
                       })}
            </Row>
        </>
    );
}