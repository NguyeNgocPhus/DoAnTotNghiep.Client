import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Form, Switch } from 'antd';
import { AdminCommomLayout } from '../../common/layout/admin/admin-common';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
const { Title } = Typography;

export const CreateRole = () => {
    const onFinish = (values) => {
        console.log('Success:', values);


    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <AdminCommomLayout>
            <Row style={{ padding: '20px' }} gutter={[0, 32]}>
                <Col span={24}>
                    <div className='header_list_users'>
                        <Title level={5}>Tạo nhóm người dùng</Title>
                        
                    </div>
                </Col>
                <Col span={24}>
                    <Form
                        style={{width:'50%'}}
                        name="basic"
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên Workflow"
                            name="name"

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mô tả"
                            name="description"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Active" name="active" valuePropName="checked">
                            <Switch />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </Form></Col>

            </Row>

        </AdminCommomLayout>

    );
}

