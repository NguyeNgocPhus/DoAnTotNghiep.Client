import { Col, Row } from "antd";

import { AdminLeftCommomLayout } from "./left/admin-left-common";

import { HeaderCommomLayout } from "./header-common";

export const AdminCommomLayout = ({ children }) => {

    return (
        <div className="fullScreen">
            <Row>
                <Col span={3}>
                    <AdminLeftCommomLayout></AdminLeftCommomLayout>
                </Col>
                <Col span={21}>
                    <HeaderCommomLayout></HeaderCommomLayout>
                    {children}
                </Col>
            </Row>


        </div>
    )
}