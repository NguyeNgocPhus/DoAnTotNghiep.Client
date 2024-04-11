import { useEffect, useState } from 'react';
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Dropdown, Modal, Form, message, Popconfirm, Spin } from 'antd';
import { SearchOutlined, PlusOutlined, DownOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { REQUEST_STATE } from '../../../../app-config/constants';
import { useCreateWfDefinition } from '../../../../store/workflow/use-create-wf-definition';
import { useGetListWfDefinition } from '../../../../store/workflow/use-get-list-wf-definition';
import { useNavigate } from 'react-router-dom';
import { useDeleteWfDefinition } from '../../../../store/workflow/use-delete-wf-definition';
const { Title } = Typography;

export const ListWorkflowDefinition = () => {
    const items = [
        {
            key: '1',
            label: (
                "Sửa"
            ),
            icon: <EditOutlined />,
        },
        {
            key: '2',
            label: (
                "Xoá"
            ),
            icon: <DeleteOutlined />,
        },
    ];
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, { id, name }) => (
                <>
                    <a href={`/admin/workflow-definition/${id}`}>
                        {name} - {id}
                    </a>

                </>
            ),
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
            title: 'version',
            dataIndex: 'version',
            key: 'version',
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_, record) =>
                listWfDefinition.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => onConfirmDelete(record.id)}>
                        <a>Xoá</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    const navigate = useNavigate();
    const [createWfDefinitionApiData, requestCreateWfDefinitionApiData] = useCreateWfDefinition();
    const [listWfDefinitionRequestData, requestGetListWfDefinitionData] = useGetListWfDefinition();
    const [deleteWfDefinitionApiData, requestDeleteWfDefinitionApiData] = useDeleteWfDefinition();

    const [loading, setLoading] = useState(false);
    const [listWfDefinition, setListWfDefinition] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onConfirmDelete = (id) => {
        requestDeleteWfDefinitionApiData({ id })
    }
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        requestCreateWfDefinitionApiData(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        if (createWfDefinitionApiData !== null) {
            if (createWfDefinitionApiData.state === REQUEST_STATE.SUCCESS) {
                console.log("createWfDefinitionApiData", createWfDefinitionApiData);
                setIsModalOpen(false);
                // message.success('Loading finished', 2.5);
                navigate(`/admin/workflow-definition/${createWfDefinitionApiData.data.definitionId}`)

            } else if (createWfDefinitionApiData.state === REQUEST_STATE.ERROR) {
                // message.error('This is an error message');
            } else if (createWfDefinitionApiData.state === REQUEST_STATE.REQUEST) {
                // message.loading('Action in progress..', 2.5)
            }
        }
    }, [createWfDefinitionApiData])

    useEffect(() => {
        if (listWfDefinitionRequestData !== null) {
            if (listWfDefinitionRequestData.state === REQUEST_STATE.SUCCESS) {
                let index = 0;
                var listData = listWfDefinitionRequestData.data.map(x => {
                    index = index + 1;
                    return {
                        id: x.definitionId,
                        key: x.definitionId,
                        status: "publish",
                        name: x.name,
                        version: x.version
                    }
                });
                setLoading(false);
                setListWfDefinition(listData);
            } else if (listWfDefinitionRequestData.state === REQUEST_STATE.ERROR) {

            } else if (listWfDefinitionRequestData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [listWfDefinitionRequestData])


    useEffect(() => {
        requestGetListWfDefinitionData({});
    }, [])

    useEffect(() => {
        if (deleteWfDefinitionApiData !== null) {
            if (deleteWfDefinitionApiData.state === REQUEST_STATE.SUCCESS) {

                message.success('delete success', 2.5);
                const newListWfDefinition = listWfDefinition.filter(x => x.id !== deleteWfDefinitionApiData.data)
                setListWfDefinition(newListWfDefinition);

            } else if (deleteWfDefinitionApiData.state === REQUEST_STATE.ERROR) {
                // message.error('This is an error message');
            } else if (deleteWfDefinitionApiData.state === REQUEST_STATE.REQUEST) {

            }
        }
    }, [deleteWfDefinitionApiData])
    return (

        <>
            <Row style={{ padding: "20px" }}>
                <Col span={24}>
                    <div className='header_list_users'>
                        <Title level={5}>Danh sách Workflow Definition</Title>
                        <div>
                            <Button onClick={showModal} icon={<PlusOutlined />} type="primary" size="large">Tạo workflow</Button>
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <Input icon={<SearchOutlined />} style={{ width: '70%' }} size="large" placeholder="Tìm kiếm theo tên, email hoặc số điện thoại" prefix={<SearchOutlined />} />
                </Col>
                <Col span={24}>
                    <Spin size="large" spinning={loading}>
                        {listWfDefinition &&
                            <Table columns={columns} dataSource={listWfDefinition} />
                        }
                    </Spin>
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

