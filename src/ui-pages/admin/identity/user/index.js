import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Modal, Form, Spin, Pagination, Popconfirm, notification, Select } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { CreateUser } from './create';
import { useGetUsers } from '../../../../store/auth/use-get-users';
import { REQUEST_STATE } from '../../../../app-config/constants';
import { UpdateUser } from './update';
import { useDeleteUser } from '../../../../store/auth/use-delete-user';
import { AdminCommomLayout } from '../../../common/layout/admin/admin-common';
import { useGetRoles } from '../../../../store/auth/use-get-roles';
const { Title } = Typography;


export const ListUsers = () => {
    const columns = [
        {
            title: 'Tên',
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
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Quyền',
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

    const [rolesApiData, requestGetRolesApiData] = useGetRoles();
    const [deleteUserApiData, requestDeleteUserApiData] = useDeleteUser();
    const [listRole, setListRole] = useState([]);

    // search field
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    const [searchRole , setSearchRole] = useState([]);

    useEffect(() => {
        requestGetUsersApiData({
            page: 1
        });
        requestGetRolesApiData();
    }, []);
    useEffect(() => {
        if (rolesApiData !== null) {
            if (rolesApiData.state === REQUEST_STATE.SUCCESS) {

                var roles = rolesApiData.data.map(x => {
                    return {
                        label: x.name,
                        value: x.name,
                    }
                });
                setListRole(roles);
            } else if (rolesApiData.state === REQUEST_STATE.ERROR) {

            } else if (rolesApiData.state === REQUEST_STATE.REQUEST) {

            }
        }
    }, [rolesApiData])

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
       
        requestGetUsersApiData({
            page: currentPage
        });

    }
    const onOpenModalCreate = () => {
        setIsModalOpenCreate(true);
    };
    const handleCancelCreate = () => {
        setIsModalOpenCreate(false);
    };

    // update user
    const onUpdateUserSuccess = (user) => {
        requestGetUsersApiData({
            page: currentPage
        });
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
    const onFilterUsers = () => {
        requestGetUsersApiData({
            page: currentPage,
            name: searchName,
            email: searchEmail,
            phoneNumber: searchPhone,
            roles: searchRole
        });
    };
    const onClearFilter = (value) => {
        setSearchEmail("");
        setSearchName("");
        setSearchPhone("");
        setSearchRole([]);
        requestGetUsersApiData({
            page: currentPage
        });
    };


    return (
        <>
            <AdminCommomLayout>
                <Row style={{ padding: '20px' }}>
                    <Col span={24}>
                        <div className='header_list_users'>
                            <Title level={5}>Danh sách người dùng</Title>

                        </div>
                    </Col>
                    <Col span={24}>
                        <div className='table'>
                            <div className='table_add'>
                                <Button onClick={onOpenModalCreate} icon={<PlusOutlined />} type="primary" size="large">Tạo người dùng</Button>
                            </div>
                            <Row className='table_filter' gutter={[15, 0]}>
                                <Col span={4} className='field_filter'>
                                    <div className='field_name'>
                                        Tên
                                    </div>
                                    <Input value={searchName} onChange={(e)=>{setSearchName(e.target.value)}} size="small" placeholder="Tìm kiếm theo tên" />

                                </Col>
                                <Col span={4} className='field_filter'>
                                    <div className='field_name'>
                                        Email
                                    </div>
                                    <Input value={searchEmail} onChange={(e)=>{setSearchEmail(e.target.value)}} size="small" placeholder="Tìm kiếm theo email" />

                                </Col>
                                <Col span={4} className='field_filter'>
                                    <div className='field_name'>
                                        Số điện thoại
                                    </div>
                                    <Input value={searchPhone} onChange={(e)=>{setSearchPhone(e.target.value)}}  size="small" placeholder="Tìm kiếm theo số điện thoại" />

                                </Col>
                                <Col span={4} className='field_filter'>
                                    <div className='field_name'>
                                        Quyền
                                    </div>
                                    {listRole.length > 0 && <Select
                                        size="small"
                                        mode="multiple"
                                        allowClear
                                        style={{
                                            width: '100%',
                                        }}
                                        value={searchRole}
                                        placeholder="Chọn nhóm người dùng"
                                        onChange={(values)=>{setSearchRole(values)}}
                                        options={listRole}
                                    />}

                                </Col>
                                <Col span={4} style={{ display: "flex", alignItems: 'end', gap: '10px' }}>
                                    <Button size='small' type='primary' onClick={onFilterUsers}>Lọc</Button>
                                    <Button size='small' onClick={onClearFilter}>Clear bộ lọc</Button>
                                </Col>
                            </Row>
                            <Table scroll={{ y: 500 }} className='table_data' size="middle" pagination={false} loading={loading} columns={columns} dataSource={listUser} />

                            <div className='table_paging'>
                                <div><b>Tổng số : {total}</b></div>
                                <Pagination style={{ marginTop: '10px' }} defaultCurrent={1} current={currentPage} onChange={onChange} total={total} />

                            </div>
                        </div>

                    </Col>
                </Row>
                <CreateUser isModalOpen={isModalOpenCreate} handleCancel={handleCancelCreate} onCreateUserSuccess={onCreateUserSuccess} ></CreateUser>
                <UpdateUser id={idUserUpdate} isModalOpen={isModalOpenUpdate} handleCancel={handleCancelUpdate} onUpdateUserSuccess={onUpdateUserSuccess} ></UpdateUser>
            </AdminCommomLayout>
        </>



    );
}

