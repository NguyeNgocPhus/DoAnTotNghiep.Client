import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Modal, Form, Spin, Pagination, Popconfirm, notification } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { CreateUser } from './create';
import { useGetUsers } from '../../../../store/auth/use-get-users';
import { REQUEST_STATE } from '../../../../app-config/constants';
import { UpdateUser } from './update';
import { useDeleteUser } from '../../../../store/auth/use-delete-user';
const { Title } = Typography;


export const ListUsers = () => {
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
            title: '',
            key: 'action',
            dataIndex: 'action',
            render: (_, data) => (
                <>

                    <Row gutter={[10, 20]}>

                        <Col >
                            <EditOutlined onClick={() => { onOpenModalUpdate(data.key) }} className='import_teamplate_action_icon' style={{ cursor: 'pointer' }} />
                            <Popconfirm
                                title="Xác nhận xoá dữ liệu"
                                onConfirm={() => { onDeleteUser(data.key) }}
                                // description="Are you sure to delete this task?"
                                icon={
                                    <QuestionCircleOutlined
                                        style={{
                                            color: 'red',
                                        }}
                                    />
                                }
                            >
                                <DeleteOutlined className='import_teamplate_action_icon' style={{ cursor: 'pointer', color: 'red' }} />
                            </Popconfirm>

                        </Col>
                    </Row>



                </>
            ),
        },
    ];

    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    const [idUserUpdate, setIdUserUpdate] = useState(null);
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [idUserDelete, setIdUserDelete] = useState(null);

    const [getUsersApiData, requestGetUsersApiData] = useGetUsers();

    const [deleteUserApiData, requestDeleteUserApiData] = useDeleteUser();

    useEffect(() => {
        requestGetUsersApiData({
            page: 1
        });
    }, []);

    // list user
    useEffect(() => {
        if (getUsersApiData !== null) {
            if (getUsersApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);

                var data = getUsersApiData.data.items.map(x => {
                    return {
                        email: x.email,
                        key: x.id,
                        userName: x.userName,
                        phoneNumber: x.phoneNumber,
                        roles: x.roles
                    }
                });
                setTotal(getUsersApiData.data.totalCount);
                setCurrentPage(getUsersApiData.data.pageIndex)
                setListUser([...data]);

            } else if (getUsersApiData.state === REQUEST_STATE.ERROR) {

            } else if (getUsersApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [getUsersApiData])

    // delete user
    useEffect(() => {
        if (deleteUserApiData !== null) {
            if (deleteUserApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                notification.success({
                    message: 'Xoá thành công',
                });

                var newListUser = listUser.filter(x => x.key != idUserDelete);
                setListUser([...newListUser]);
                setTotal(total - 1);

            } else if (deleteUserApiData.state === REQUEST_STATE.ERROR) {

            } else if (deleteUserApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [deleteUserApiData])

    const onChange = (page) => {

        setCurrentPage(page);
        requestGetUsersApiData({
            page: page
        });
    };

    // create user
    const onCreateUserSuccess = (user) => {
        setListUser([{
            email: user.email,
            key: user.id,
            userName: user.userName,
            phoneNumber: user.phoneNumber,
            roles: user.roles
        }, ...listUser]);
        setTotal(total + 1);

    }
    const onOpenModalCreate = () => {
        setIsModalOpenCreate(true);
    };
    const handleCancelCreate = () => {
        setIsModalOpenCreate(false);
    };

    // update user
    const onUpdateUserSuccess = (user) => {
        var newListUser  = listUser.map(x=>{
            if(x.key === user.id){
                
                return {...user, key : user.id};
            }else{
                return x;
            }
        });
        setListUser([...newListUser]);
    }

    const onOpenModalUpdate = (Id) => {
        setIsModalOpenUpdate(true);
        setIdUserUpdate(Id);
    };
    const handleCancelUpdate = () => {
        setIsModalOpenUpdate(false);
    };



    // delete user
    const onDeleteUser = (id) => {
        setIdUserDelete(id);
        requestDeleteUserApiData({ id });

    }
    return (
        <>
            <Row style={{ padding: '20px' }} gutter={[0, 32]}>
                <Col span={24}>
                    <div className='header_list_users'>
                        <Title level={5}>Danh sách người dùng</Title>
                        <div>
                            <Button onClick={onOpenModalCreate} icon={<PlusOutlined />} type="primary" size="large">Tạo người dùng</Button>
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <Input icon={<SearchOutlined />} style={{ width: '70%' }} size="large" placeholder="Tìm kiếm theo tên, email hoặc số điện thoại" prefix={<SearchOutlined />} />
                </Col>
                <Col span={24}>
                    <Table size="middle" pagination={false} loading={loading} columns={columns} dataSource={listUser} />
                    <Pagination style={{ marginTop: '10px' }} showTotal={t => <b>Tổng số : {t}</b>} defaultCurrent={1} current={currentPage} onChange={onChange} total={total} />
                </Col>
            </Row>
            <CreateUser isModalOpen={isModalOpenCreate} handleCancel={handleCancelCreate} onCreateUserSuccess={onCreateUserSuccess} ></CreateUser>
            <UpdateUser id={idUserUpdate} isModalOpen={isModalOpenUpdate} handleCancel={handleCancelUpdate} onUpdateUserSuccess={onUpdateUserSuccess} ></UpdateUser>
        </>



    );
}

