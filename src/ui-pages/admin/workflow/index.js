import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import {Button, Col, Input, Row, Space, Table, Typography, Tag, Dropdown } from 'antd';
import { AdminCommomLayout } from '../../common/layout/admin/admin-common';
import { SearchOutlined , PlusOutlined,DownOutlined} from '@ant-design/icons';
const { Title } = Typography;
const items = [
    {
      key: '1',
      label: 'Action 1',
    },
    {
      key: '2',
      label: 'Action 2',
    },
  ];
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_, { status }) => (
            <>
             <Tag key={status}>
                    {status}
                  </Tag>
            </>
          ),
    },
    {
        title: 'count',
        dataIndex: 'count',
        key: 'count',
    },
    {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <Dropdown
              menu={{
                items,
              }}
            >
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
];
const data = [
    {
        key: '1',
        name: 'Cuộc hội thoại được tạo',
        status: 32,
        count:1
        
    },
    {
        key: '2',
        name: 'Tải lên - Báo cáo TCKT',
        status: 32,
        count:0
    },
    {
        key: '3',
        name: 'Tải lên - Báo cáo QTKD',
        status: 32,
        count:3
    },
    
];
export const ListWorkflow = () => {

    const navigate = useNavigate();
    
    const navigateTo = () => navigate('/admin/workflow/create');
    return (
        <AdminCommomLayout>
            <Row style={{padding:'20px'}} gutter={[0,32]}>
                <Col span={24}>
                    <div className='header_list_users'>
                        <Title level={5}>Danh sách Workflow</Title>
                        <div>
                            <Button onClick={navigateTo} icon={<PlusOutlined />} type="primary" size="large">Tạo workflow</Button>
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

