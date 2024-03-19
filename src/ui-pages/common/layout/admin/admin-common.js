import { Button, Col, Layout, Menu, Row, Input } from "antd";

import { ArrowRightOutlined, PhoneOutlined, DingtalkOutlined } from '@ant-design/icons';
import { AdminLeftCommomLayout } from "./left/admin-left-common";
const { Content, Footer } = Layout;
const { Search } = Input;


export const AdminCommomLayout = ({ children }) => {


    return (
        <div className="fullScreen">
            <Row>
                <Col span={1}>
                    <AdminLeftCommomLayout></AdminLeftCommomLayout>
                </Col>
                <Col span={23}>
                    {children}
                </Col>
            </Row>


        </div>
    )
}