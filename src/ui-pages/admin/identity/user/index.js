import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Modal, Form, Spin } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { CreateUser } from './create';
import { useGetUsers } from '../../../../store/auth/use-get-users';
import { REQUEST_STATE } from '../../../../app-config/constants';
const { Title } = Typography;
const columns = [
    {
        title: 'Name',
        dataIndex: 'userName',
        key: 'userName',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone Numner',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'Roles',
        key: 'roles',
        dataIndex: 'roles',
        render: (_, { roles }) => (
            <>
                {roles.map((role) => {
                    let color = role.length > 5 ? 'geekblue' : 'green';
                    if (role === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={role}>
                            {role.toUpperCase()}
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
                <a>Edit {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

export const ListUsers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [getUsersApiData, requestGetUsersApiData] = useGetUsers();
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        requestGetUsersApiData();
    }, []);


    useEffect(() => {
        if (getUsersApiData !== null) {
            if (getUsersApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);

                var data = getUsersApiData.data.map(x => {
                    return {
                        email: x.email,
                        key: x.id,
                        userName: x.userName,
                        phoneNumber: x.phoneNumber,
                        roles: x.roles
                    }
                })
                setListUser([...data]);

            } else if (getUsersApiData.state === REQUEST_STATE.ERROR) {

            } else if (getUsersApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [getUsersApiData])

    const onCreateUserSuccess = (user) => {
        setListUser([{
            email: user.email,
            key: user.id,
            userName: user.userName,
            phoneNumber: user.phoneNumber,
            roles: user.roles
        }, ...listUser]);
    }
    const onOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Row style={{ padding: '20px' }} gutter={[0, 32]}>
                <Col span={24}>
                    <div className='header_list_users'>
                        <Title level={5}>Danh sách người dùng</Title>
                        <div>
                            <Button onClick={onOpenModal} icon={<PlusOutlined />} type="primary" size="large">Tạo người dùng</Button>
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <Input icon={<SearchOutlined />} style={{ width: '70%' }} size="large" placeholder="Tìm kiếm theo tên, email hoặc số điện thoại" prefix={<SearchOutlined />} />
                </Col>
                <Col span={24}>
                    <Table loading={loading} columns={columns} dataSource={listUser} />

                </Col>
            </Row>
            <CreateUser isModalOpen={isModalOpen} handleCancel={handleCancel} onCreateUserSuccess={onCreateUserSuccess} ></CreateUser>
        </>



    );
}

