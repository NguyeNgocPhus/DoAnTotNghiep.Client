import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import {Button, Col, Input, Row, Space, Table, Typography, Tag, Modal, Form, Upload } from 'antd';
import { AdminCommomLayout } from '../../../common/layout/admin/admin-common';
import { SearchOutlined , PlusOutlined, CheckOutlined, UploadOutlined, HistoryOutlined} from '@ant-design/icons';
const { Title } = Typography;


export const ListApprove = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Active',
            key: 'active',
            dataIndex: 'active',
            render: (_, { active }) => (
                <>
                    {active && <CheckOutlined />}
                </>
            ),
        }
    ];
    const data = [
        {
            key: '1',
            name: 'Administrators',
            code: 'Administrators',
            active: true
        },
        {
            key: '2',
            name: 'Quy trình làm việc',
            code: 'Workflow',
            active: true
        },
        {
            key: '3',
            name: 'Tải lên tài liệu',
            code: 'UploadData',
            active: false
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const navigate = useNavigate();

    const navigateTo = () => navigate('/admin/role/create');
    const onClickViewHistory = () =>{
        console.log("onClickViewHistory")
    }
    const onClickUploadDocument = () =>{
        showModal(true);
    }
    
    return (
        <>
            <Row style={{padding:'20px'}} gutter={[0,32]}>
                <Col span={24}>
                    <div className='header_list_users'>
                        <Title level={5}>Danh sách dữ liệu phê duyệt</Title>
                    </div>
                </Col>
                <Col span={24}>
                    <Input icon={<SearchOutlined />}  style={{width:'70%'}}  size="large" placeholder="Tìm kiếm theo tên mẫu nhập" prefix={<SearchOutlined />} />
                </Col>
                <Col span={24}>
                    <Table columns={columns} dataSource={data} />
                </Col>
            </Row>
           
             
        </>

    );
}

