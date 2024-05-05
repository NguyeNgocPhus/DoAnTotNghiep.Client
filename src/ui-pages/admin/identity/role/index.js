import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Modal, Form } from 'antd';
import { AdminCommomLayout } from '../../../common/layout/admin/admin-common';
import { SearchOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { useGetRoles } from '../../../../store/auth/use-get-roles';
import { REQUEST_STATE } from '../../../../app-config/constants';
const { Title } = Typography;
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Active',
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
    return (
        <>
            <Row style={{ padding: '20px' }} gutter={[0, 32]}>
                <Col span={24}>
                    <div className='header_list_users'>
                        <Title level={5}>Danh sách nhóm người dùng</Title>
                        {/* <div>
                            <Button onClick={onOpenModal} icon={<PlusOutlined />} type="primary" size="large">Tạo nhóm người dùng</Button>
                        </div> */}
                    </div>
                </Col>
                <Col span={24}>
                    <Input icon={<SearchOutlined />} style={{ width: '70%' }} size="large" placeholder="Tìm kiếm theo tên nhóm người dùng" prefix={<SearchOutlined />} />
                </Col>
                <Col span={24}>
                    <Table loading={loading} columns={columns} dataSource={listRole} />
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
        </>
    );
}

