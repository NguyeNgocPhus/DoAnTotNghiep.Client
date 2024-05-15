import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Modal, Form, Pagination } from 'antd';
import { AdminCommomLayout } from '../../../common/layout/admin/admin-common';
import { SearchOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { useGetRoles } from '../../../../store/auth/use-get-roles';
import { REQUEST_STATE } from '../../../../app-config/constants';
const { Title } = Typography;
const columns = [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Trạng thái',
        key: 'active',
        dataIndex: 'active',
        render: (_, { active }) => (
            <>
                {active && <CheckOutlined style={{color:'green'}}/>}
            </>
        ),
    },
];
export const ListRole = () => {
    const [rolesApiData, requestGetRolesApiData] = useGetRoles();
    const [listRole, setListRole] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    useEffect(()=>{
        requestGetRolesApiData();
    },[]);
    useEffect(() => {
        if (rolesApiData !== null) {
            if (rolesApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                var roles = rolesApiData.data.map(x => {
                    return {
                        key: x.id,
                        name: x.name,
                        code : x.roleCode,
                        description: x.description,
                        active: true
                    }
                });
                setListRole(roles);
            } else if (rolesApiData.state === REQUEST_STATE.ERROR) {

            } else if (rolesApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [rolesApiData])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const onOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = (page) => {

        setCurrentPage(page);
        requestGetRolesApiData({
            page: page
        });
    };
    return (
        <>
        <AdminCommomLayout>
            <Row style={{ padding: '20px' }}>
                <Col span={24}>
                    <div className='header_list_users'>
                        <Title level={5}>Danh sách nhóm người dùng</Title>
                        {/* <div>
                            <Button onClick={onOpenModal} icon={<PlusOutlined />} type="primary" size="large">Tạo nhóm người dùng</Button>
                        </div> */}
                    </div>
                </Col>
              
                <Col span={24}>
                    {/* <Table size="middle" loading={loading} columns={columns} dataSource={listRole} /> */}
                    <div className='table'>
                            <Row className='table_filter' gutter={[15,0]}>
                                <Col span={4} className='field_filter'>
                                    <div className='field_name'>
                                        Tên
                                    </div>
                                    <Input size="small" placeholder="Tìm kiếm theo tên"/>

                                </Col>
                                <Col span={4} className='field_filter'>
                                    <div className='field_name'>
                                        Code
                                    </div>
                                    <Input size="small" placeholder="Tìm kiếm theo tên"/>

                                </Col>
                            
                                
                                <Col span={4} style={{display: "flex", alignItems:'end', gap:'10px'}}>
                                <Button size='small' type='primary'>Lọc</Button>
                                    <Button size='small'>Clear bộ lọc</Button>
                                </Col>
                            </Row>
                            <Table scroll={{y:600}} className='table_data' size="middle" pagination={false} loading={loading} columns={columns} dataSource={listRole} />

                            <div className='table_paging'>
                                <div><b>Tổng số : {total}</b></div>
                                <Pagination style={{ marginTop: '10px' }} defaultCurrent={1} current={currentPage} onChange={onChange} total={total} />

                            </div>
                        </div>
                </Col>
            </Row>
            <Modal title="Tạo flow mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
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


                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            </AdminCommomLayout>
        </>
    );
}

