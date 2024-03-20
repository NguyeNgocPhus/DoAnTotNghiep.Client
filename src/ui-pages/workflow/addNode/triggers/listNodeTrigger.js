import { Col, Drawer, Row, Tabs } from "antd";
import { NodeTrigger } from "./nodeTrigger";
import { CloseCircleOutlined } from '@ant-design/icons';
import "./styles.css";
export const ListNodeTrigger = () => {

    const listTrigger = [
        {
            image: "",
            name: "Đăng ký mới (tất cả các kênh)",
            description: "Kích hoạt khi có khách hàng đăng ký từ bất kỳ kênh nào"
        },
        {
            image: "",
            name: "Được gắn tag",
            description: "Kích hoạt khi có khách hàng được gắn tag"
        },
        {
            image: "",
            name: "Bị xoá tag",
            description: "Kích hoạt khi có khách hàng bị xoá tag"
        }
    ]

    return (
        <>

            <Row className="dndflow">
                <Col span={24}>Danh sách Triggers</Col>
                {listTrigger.length && listTrigger.map((trigger, index) => {
                    return (
                        <Col span={24}>
                            <aside>
                                <NodeTrigger trigger={trigger}></NodeTrigger>
                            </aside>
                        </Col>
                    )
                })}
            </Row>

        </>
    );
}