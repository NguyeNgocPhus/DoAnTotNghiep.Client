import { useEffect, useState } from 'react';
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Dropdown, Modal, Form, message, Popconfirm, Spin, Pagination } from 'antd';
import { SearchOutlined, PlusOutlined, DownOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { REQUEST_STATE } from '../../../../app-config/constants';
import { useCreateWfDefinition } from '../../../../store/workflow/use-create-wf-definition';
import { useGetListWfDefinition } from '../../../../store/workflow/use-get-list-wf-definition';
import { useNavigate } from 'react-router-dom';
import { useDeleteWfDefinition } from '../../../../store/workflow/use-delete-wf-definition';
import { AdminCommomLayout } from '../../../common/layout/admin/admin-common';
import { HeaderCommomLayout } from '../../../common/layout/admin/header-common';
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
            title: 'Tên quy trình',
            dataIndex: 'name',
            key: 'name',
            render: (_, { id, name }) => (
                <>
                    <a href={`/admin/workflow-definition/${id}`}>
                        {name}
                    </a>

                </>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (_, { description }) => (
                <>
                    {description}

                </>
            ),
        },
        {
            title: 'Trạng thái',
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
            title: 'Phiên bản',
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
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);

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
                setIsModalOpen(false);
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
                        description: x.description,
                        status: "publish",
                        name: x.name,
                        version: x.version
                    }
                });
                setTotal(listData.length)
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

    const onChange = (page) => {

        setCurrentPage(page);
        requestGetListWfDefinitionData({
            page: page
        });
    };
    return (

        <>
            <AdminCommomLayout>
                {/* <HeaderCommomLayout></HeaderCommomLayout> */}
                <Row style={{ padding: "20px" }}>
                    <Col span={24}>
                        <div className='header_list_users'>
                            <Title level={5}>Danh sách quy trình</Title>
                            
                        </div>
                    </Col>
                    {/* <Col span={24}>
                        <Input icon={<SearchOutlined />} style={{ width: '70%' }} size="large" placeholder="Tìm kiếm theo tên, email hoặc số điện thoại" prefix={<SearchOutlined />} />
                    </Col> */}
                    <Col span={24}>
                        {/* <Spin size="large" spinning={loading}>
                            {listWfDefinition &&
                                <Table columns={columns} dataSource={listWfDefinition} />
                            }
                        </Spin> */}
                        <div className='table'>
                            <div className='table_add'>
                                <Button onClick={showModal} icon={<PlusOutlined />} type="primary" size="large">Tạo workflow</Button>
                            </div>  
                            <Row className='table_filter' gutter={[15,0]}>
                                <Col span={4} className='field_filter'>
                                    <div className='field_name'>
                                        Tên quy trình
                                    </div>
                                    <Input size="small" placeholder="Tìm kiếm theo tên"/>

                                </Col>
                                <Col span={4} className='field_filter'>
                                    <div className='field_name'>
                                        Trạng thái
                                    </div>
                                    <Input  size="small" placeholder="Tìm kiếm theo email" />

                                </Col>
                            
                                <Col span={4} style={{display: "flex", alignItems:'end', gap:'10px'}}>
                                <Button size='small' type='primary'>Lọc</Button>
                                    <Button size='small'>Clear bộ lọc</Button>
                                </Col>
                            </Row>
                            <Table scroll={{y:450}} className='table_data' size="middle" pagination={false} loading={loading} columns={columns} dataSource={listWfDefinition} />

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

