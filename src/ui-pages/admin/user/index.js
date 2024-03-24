import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import {Button, Col, Input, Row, Space, Table, Typography, Tag } from 'antd';
import { AdminCommomLayout } from '../../common/layout/admin/admin-common';
import { SearchOutlined , PlusOutlined} from '@ant-design/icons';
const { Title } = Typography;
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
export const ListUsers = () => {

    const navigate = useNavigate();

    const navigateTo = () => navigate('/admin/user/create');
    return (
        <AdminCommomLayout>
            <Row style={{padding:'20px'}} gutter={[0,32]}>
                <Col span={24}>
                    <div className='header_list_users'>
                        <Title level={5}>Danh sách người dùng</Title>
                        <div>
                            <Button onClick={navigateTo} icon={<PlusOutlined />} type="primary" size="large">Tạo khách hàng mới</Button>
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <Input icon={<SearchOutlined />}  style={{width:'70%'}}  size="large" placeholder="Tìm kiếm theo tên, email hoặc số điện thoại" prefix={<SearchOutlined />} />
                </Col>
                <Col span={24}>
                    <Table columns={columns} dataSource={data} />
                </Col>
            </Row>

        </AdminCommomLayout>

    );
}

